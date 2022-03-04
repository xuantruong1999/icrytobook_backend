import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'process';

@Module({
  imports: [UsersModule,  ConfigModule.forRoot({
    validationSchema: Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      PORT: Joi.number().default(3000),
      MONGO_URI: Joi.string().required(),
      MONGO_USERNAME: Joi.string(),
      MONGO_PASSWORD: Joi.string(),
      MONGO_DB_NAME: Joi.string(),
    }),

    validationOptions: {
      allowUnknown: true,
      abortEarly: true,
    },

  }),
MongooseModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => {
    const databaseName = configService.get('MONGO_DB_NAME');
    const mongoURI = configService.get('MONGO_URI');
    return {
      uri: mongoURI,
      dbName: databaseName,
    };
  },
  inject: [ConfigService],
})
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
