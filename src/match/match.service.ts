import {
  Injectable,
  Logger,
  NotFoundException,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match } from "../entities/match.entity";
import { Tie } from "../entities/tie.entity";
import { MatchStatus } from "../entities/match.entity";

@Injectable()
export class MatchService {
  private readonly logger = new Logger(MatchService.name);
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Tie)
    private readonly tieRepository: Repository<Tie>
  ) {}

  async updateMatchScore(
    matchId: number,
    scoreTeam1: number,
    scoreTeam2: number
  ): Promise<Match> {
    // Load match (including its tie relation)
    const match = await this.matchRepository.findOne({
      where: { match_id: matchId },
      relations: ["tie"],
    });
    if (!match) {
      throw new NotFoundException(`Match with id ${matchId} not found`);
    }

    // Check if match is already finished
    if (match.status === MatchStatus.FINISHED) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: "Cannot update score of a finished match",
          match_id: matchId,
        },
        HttpStatus.BAD_REQUEST
      );
    }

    // If match is pending, set it to running
    if (match.status === MatchStatus.PENDING) {
      match.status = MatchStatus.RUNNING;
    }

    this.logger.log(`Found match ${matchId} with tie_id: ${match.tie?.tie_id}`);

    // Update the match's scores
    match.score_team1 = scoreTeam1;
    match.score_team2 = scoreTeam2;
    const updatedMatch = await this.matchRepository.save(match);

    // If the match belongs to a tie, update cumulative scores
    if (updatedMatch.tie) {
      this.logger.log(
        `Updating cumulative scores for tie ${updatedMatch.tie.tie_id}`
      );

      // First, get the fresh tie data
      const tie = await this.tieRepository.findOne({
        where: { tie_id: updatedMatch.tie.tie_id },
        relations: ["matches"],
      });

      if (!tie) {
        this.logger.error(`Tie ${updatedMatch.tie.tie_id} not found`);
        return updatedMatch;
      }

      // Fetch all matches linked to this tie using the tie_id
      const tieMatches = await this.matchRepository.find({
        where: { tie: { tie_id: tie.tie_id } },
      });

      this.logger.log(
        `Found ${tieMatches.length} matches for tie ${tie.tie_id}`
      );
      this.logger.log(
        "Match scores:",
        tieMatches.map((m) => ({
          match_id: m.match_id,
          score_team1: m.score_team1,
          score_team2: m.score_team2,
        }))
      );

      // Calculate cumulative scores
      const cumulativeScoreTeam1 = tieMatches.reduce(
        (sum, m) => sum + Number(m.score_team1),
        0
      );
      const cumulativeScoreTeam2 = tieMatches.reduce(
        (sum, m) => sum + Number(m.score_team2),
        0
      );

      this.logger.log(
        `Calculated cumulative scores - Team1: ${cumulativeScoreTeam1}, Team2: ${cumulativeScoreTeam2}`
      );

      // Update the tie entity directly
      await this.tieRepository
        .createQueryBuilder()
        .update(Tie)
        .set({
          cumulativeScoreTeam1: cumulativeScoreTeam1,
          cumulativeScoreTeam2: cumulativeScoreTeam2,
        })
        .where("tie_id = :tieId", { tieId: tie.tie_id })
        .execute();

      this.logger.log(`Updated tie ${tie.tie_id} with new cumulative scores`);
    }

    return updatedMatch;
  }

  async updateMatchStatus(id: number, newStatus: MatchStatus) {
    if (newStatus === MatchStatus.RUNNING) {
      const startTime = new Date();
      const theoreticalEndTime = new Date(startTime.getTime() + 2 * 60 * 1000);
      await this.matchRepository.update(
        { match_id: id },
        {
          status: newStatus,
          start_time: startTime,
          theoretical_end_time: theoreticalEndTime,
        }
      );
    } else if (newStatus === MatchStatus.FINISHED) {
      const endTime = new Date();
      await this.matchRepository.update(
        { match_id: id },
        {
          status: newStatus,
          end_time: endTime,
        }
      );
    }
  }

  async getMatchStatus(matchId): Promise<MatchStatus> {
    const match = await this.matchRepository.findOne({
      where: { match_id: matchId }
    });
    if (!match) {
      throw new NotFoundException(`Match with id ${matchId} not found`);
    }
    return (match.status);
  }
}
