import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MatchModule } from "./match/match.module";
import { ParticipantModule } from "./participant/participant.module";
import { TeamModule } from "./team/team.module";
import { PowerupModule } from "./powerup/powerup.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "env.development.local",
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
        synchronize: true,
        autoLoadEntities: true,
      }),
    }),
    MatchModule,
    ParticipantModule,
    TeamModule,
    PowerupModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
