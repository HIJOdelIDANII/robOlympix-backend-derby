import { IsString, Length, IsInt } from "class-validator";

export class CreateTeamDto {
  @IsString()
  @Length(1, 50)
  team_name: string;
}
