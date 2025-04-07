import { IsString, Length, IsOptional } from "class-validator";

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  team_name?: string;
}
