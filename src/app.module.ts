import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchModule } from "./match/match.module";
import { ParticipantModule } from "./participant/participant.module";
import { TeamModule } from "./team/team.module";
import { PowerupModule } from "./powerup/powerup.module";
import { Team } from "./entities/team.entity";
import { Participant } from "./entities/participant.entity";
import { Match } from "./entities/match.entity";
import { PowerUp } from "./entities/powerup.entity";
import { Violation } from "./entities/violation.entity";
import { MatchPowerUp } from "./entities/match-powerup.entity";
import { KnockoutModule } from "./knockout/knockout.module";
import { Tie } from "./entities/tie.entity";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env.development.local",
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "mysql",
        host: configService.get<string>("DB_HOST"),
        port: configService.get<number>("DB_PORT"),
        username: configService.get<string>("DB_USERNAME"),
        password: configService.get<string>("DB_PASSWORD"),
        database: configService.get<string>("DB_NAME"),
        entities: [
          Team,
          Participant,
          Match,
          PowerUp,
          Violation,
          MatchPowerUp,
          Tie,
        ],
        synchronize: true,
      }),
    }),
    MatchModule,
    ParticipantModule,
    TeamModule,
    PowerupModule,
    KnockoutModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
