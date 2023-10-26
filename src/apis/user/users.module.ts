import { Module, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from '../auth/auth.service';
import { Blog } from '../blog/entities/blog.entity';
import { Profile } from '../profile/entities/profile.entity';
import { User } from './entities/user.entity';
import { UserRepository } from './entities/user.repository';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Blog]),
    forwardRef(() => AuthModule),
  ],
  controllers: [UsersController],
  providers: [UsersService, UserRepository, JwtService, AuthService],
  exports: [UserRepository],
})
export class UsersModule {}
