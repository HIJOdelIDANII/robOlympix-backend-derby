import { Body, Controller, Post } from "@nestjs/common";
import { KnockoutService } from "./knockout.service";
import { KnockoutStage } from "src/entities/tie.entity";

@Controller("knockout")
export class KnockoutController {
  constructor(private readonly knockoutService: KnockoutService) {}

  @Post("create-round-of-16")
  async createRoundOf16() {
    const ties = await this.knockoutService.createRoundOf16();
    return {
      message: "Round of 16 created successfully",
      ties,
    };
  }
  @Post("create-next-round")
  async createNextRound(@Body("currentStage") currentStage: KnockoutStage) {
    const newTies = await this.knockoutService.createNextRound(currentStage);
    return {
      message: `Next knockout round (${this.knockoutService.getNextStage(currentStage)}) created successfully.`,
      ties: newTies,
    };
  }
}
