import { IsString, IsOptional, IsJSON } from "class-validator";

export class UpdateChallengeDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsJSON()
  settings?: any;
}
