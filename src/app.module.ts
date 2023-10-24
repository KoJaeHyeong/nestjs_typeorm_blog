import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormconfig } from 'ormconfig';
import { ProfileModule } from './apis/profile/profile.module';
import { UsersModule } from './apis/user/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

const importsModules = [UsersModule, ProfileModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({ useFactory: ormconfig }),
    ...importsModules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
