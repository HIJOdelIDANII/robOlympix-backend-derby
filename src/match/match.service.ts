import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Match, MatchStatus } from "../entities/match.entity";
import { Tie } from "../entities/tie.entity";

@Injectable()
export class MatchService {
  constructor(
    @InjectRepository(Match)
    private readonly matchRepository: Repository<Match>,
    @InjectRepository(Tie)
    private readonly tieRepository: Repository<Tie>
  ) {}

  // Other methods (create, findOne, findAll, etc.)

  /**
   * Updates the score of a match, then automatically updates
   * the cumulative scores on the associated tie.
   *
   * @param matchId The id of the match to update.
   * @param scoreTeam1 The new score for team 1.
   * @param scoreTeam2 The new score for team 2.
   * @returns The updated Match.
   */
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

    // Update the match's scores
    match.score_team1 = scoreTeam1;
    match.score_team2 = scoreTeam2;
    const updatedMatch = await this.matchRepository.save(match);

    // If the match belongs to a tie, update cumulative scores
    if (updatedMatch.tie) {
      // Fetch all matches linked to this tie
      const tieMatches = await this.matchRepository.find({
        where: { tie: updatedMatch.tie },
      });

      // Calculate cumulative scores
      const cumulativeScoreTeam1 = tieMatches.reduce(
        (sum, m) => sum + m.score_team1,
        0
      );
      const cumulativeScoreTeam2 = tieMatches.reduce(
        (sum, m) => sum + m.score_team2,
        0
      );

      // Update the Tie entity
      updatedMatch.tie.cumulativeScoreTeam1 = cumulativeScoreTeam1;
      updatedMatch.tie.cumulativeScoreTeam2 = cumulativeScoreTeam2;
      await this.tieRepository.save(updatedMatch.tie);
    }

    return updatedMatch;
  }
}
