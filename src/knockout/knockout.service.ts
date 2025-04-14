import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Team } from "../entities/team.entity";
import { Tie, KnockoutStage } from "../entities/tie.entity";
import { Match, MatchStatus, RoundPosition } from "../entities/match.entity";

@Injectable()
export class KnockoutService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,

    @InjectRepository(Tie)
    private readonly tieRepository: Repository<Tie>,

    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>
  ) {}

  async createRoundOf16(): Promise<Tie[]> {

    const Round16TiesExists = await this.tieRepository.findOne({
      where : {knockout_stage: KnockoutStage.RoundOf16}
    })
    if (Round16TiesExists != null){
      throw new HttpException (`You are already have ties in Round of 16`,
        HttpStatus.BAD_REQUEST
      )
    }

    const teams = await this.teamRepository.find({
      select: ["team_id", "team_name"],
    });
    if (teams.length < 16) {
      //just for verif
      throw new NotFoundException("Not enough teams for a Round of 16");
    }

    // Shuffling using Fisher–Yates algorithm
    const shuffledTeams = [...teams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [
        shuffledTeams[j],
        shuffledTeams[i],
      ]; // it's just o(n) random picking
    }
    //taking the first 16 ofc (just for verification)
    const selectedTeams = shuffledTeams.slice(0, 16);

    const ties: Tie[] = [];

    // Pair teams and create ties along with two match legs for each tie
    for (let i = 0; i < 16; i += 2) {
      const team1 = selectedTeams[i];
      const team2 = selectedTeams[i + 1];

      const tie = this.tieRepository.create({
        knockout_stage: KnockoutStage.RoundOf16,
        team1: team1,
        team2: team2,
      });
      const createdTie = await this.tieRepository.save(tie);

      const firstMatchDto = {
        round_position: RoundPosition.FIRST_GAME,
        tie: createdTie,
        status: MatchStatus.PENDING,
      };

      const secondMatchDto = {
        round_position: RoundPosition.SECOND_GAME,
        tie: createdTie,
        status: MatchStatus.PENDING,
      };

      const firstMatch = this.matchRepository.create(firstMatchDto);
      const secondMatch = this.matchRepository.create(secondMatchDto);

      // Save the match legs
      await this.matchRepository.save(firstMatch);
      await this.matchRepository.save(secondMatch);

      ties.push(createdTie);
    }

    return ties;
  }

  getNextStage(currentStage: KnockoutStage): KnockoutStage {
    switch (currentStage) {
      case KnockoutStage.RoundOf16:
        return KnockoutStage.QuarterFinals;
      case KnockoutStage.QuarterFinals:
        return KnockoutStage.SemiFinals;
      case KnockoutStage.SemiFinals:
        return KnockoutStage.Finals;
      default:
        throw new NotFoundException(
          `No subsequent stage defined for ${currentStage}`
        );
    }
  }

  // Create the next knockout round using winners from the current stage.
  async createNextRound(currentStage: KnockoutStage): Promise<Tie[]> {

    const nextStage = this.getNextStage(currentStage);

    //Don't create a round if there a at least a tie with that round status
    const NextRoundTieExists = await this.tieRepository.findOne({
      where: {
        knockout_stage: nextStage,
      },
    });
    if (NextRoundTieExists != null){
      throw new HttpException(`You are already have ties in ${nextStage}`,
        HttpStatus.BAD_REQUEST
      )
    }

    // Retrieve all ties for the current stage with team relations
    const currentTies = await this.tieRepository.find({
      where: { knockout_stage: currentStage },
      relations: ["team1", "team2"],
    });
    if (!currentTies || currentTies.length === 0) {
      throw new NotFoundException(`No ties found for stage: ${currentStage}`);
    }
    //to do implement: verify all matches of current knockout stage are finished


    // Determine winners from each tie based on cumulative scores.
    const winners: Team[] = currentTies.map((tie) => {
      if (tie.cumulativeScoreTeam1 > tie.cumulativeScoreTeam2) {
        return tie.team1;
      } else if (tie.cumulativeScoreTeam2 > tie.cumulativeScoreTeam1) {
        return tie.team2;
      } else {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: "cumulative scores are equal",
            tie_id: tie.tie_id,
          },
          HttpStatus.BAD_REQUEST
        );
      }
    });

    if (winners.length % 2 !== 0) {
      throw new Error("Odd number of winners; cannot pair teams properly.");
    }

    // Determine the next stage
    
    const newTies: Tie[] = [];

    // Pair the winners (assumed to be already in the desired order)
    for (let i = 0; i < winners.length; i += 2) {
      const team1 = winners[i];
      const team2 = winners[i + 1];

      // Create a new tie using (for example) a CreateTie DTO structure
      // Here we construct the object directly; you may use your DTO class
      const tieData = {
        knockout_stage: nextStage,
        team1: team1,
        team2: team2,
      };
      const newTie = this.tieRepository.create(tieData);
      const createdTie = await this.tieRepository.save(newTie);

      // Create two match legs for this tie using your CreateMatchDto structure
      const matchData1 = {
        round_position: RoundPosition.FIRST_GAME,
        tie: createdTie,
        status: MatchStatus.PENDING,
      };
      const matchData2 = {
        round_position: RoundPosition.SECOND_GAME,
        tie: createdTie,
        status: MatchStatus.PENDING,
      };

      const firstMatch = this.matchRepository.create(matchData1);
      const secondMatch = this.matchRepository.create(matchData2);

      await this.matchRepository.save(firstMatch);
      await this.matchRepository.save(secondMatch);

      newTies.push(createdTie);
    }

    return newTies;
  }
}
