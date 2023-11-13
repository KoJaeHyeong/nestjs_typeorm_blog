import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'ormconfig';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { apiModules } from './common/modules/apis.modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({ useFactory: ormconfig }),
    ...apiModules,

    MulterModule.register({
      dest: './upload',
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
