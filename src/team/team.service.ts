import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Team } from "src/entities/team.entity";
import { Repository } from "typeorm";

@Injectable()
export class TeamService {
}
