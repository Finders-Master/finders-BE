import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';

import { InformationModule } from './information/information.module';
import { TYPEORM_CONFIG } from './config/constants';
import { RegisterModule } from './register/register.module';
import { AuthModule } from './auth/auth.module';
import { RegisterPatientModule } from './register-patient/register-patient.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import databaseConfig from './config/database.config';
import configSecret from './config/config';
import { MulterModule } from '@nestjs/platform-express'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        config.get<TypeOrmModuleOptions>(TYPEORM_CONFIG),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, configSecret],
      envFilePath: `.env`,
      validationSchema: Joi.object({
        NODE_ENV: Joi.string()
          .valid('development', 'production')
          .default('development'),
      }),
    }),
    RegisterModule,
    InformationModule,
    AuthModule,
    RegisterPatientModule,
    CloudinaryModule,
    MulterModule.register({
      dest: './uploads',
    })
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
