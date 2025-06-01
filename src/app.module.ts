import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validate } from './config/env.validation';
import { CacheModule } from '@nestjs/cache-manager';
import { createKeyv } from '@keyv/valkey';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validate,
    }),
    CacheModule.register({
      isGlobal: true,
      useFactory: (configService: ConfigService) => {
        const cacheConnectionUri = configService.get('cache.connectionUri');
        return {
          stores: [createKeyv(cacheConnectionUri)],
        };
      },
      inject: [ConfigService],
    }),
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
