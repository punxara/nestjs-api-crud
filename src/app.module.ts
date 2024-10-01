import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule} from "@nestjs/config";
import {TypeOrmModule} from "@nestjs/typeorm";
import { SocialController } from './social/social.controller';
import { SocialService } from './social/social.service';
import { SocialModule } from './social/social.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [

      ],
      synchronize: true,
      logging: false
    }),
    SocialModule,
  ],
  controllers: [AppController, SocialController],
  providers: [AppService, SocialService],
})
export class AppModule {}
