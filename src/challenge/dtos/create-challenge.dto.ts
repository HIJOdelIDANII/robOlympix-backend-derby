import { IsString, IsOptional, IsJSON } from "class-validator";

export class CreateChallengeDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsJSON()
  settings?: any;
}
