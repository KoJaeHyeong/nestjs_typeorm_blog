import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from 'src/apis/user/entities/user.repository';

type PayLoad = {
  email: string;
  sub: string;
  exp?: number;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }

  async validate(payload: PayLoad) {
    // const user = await this.userRepository.userFindById(payload.sub);

    // if (!user) {
    //   throw new UnauthorizedException();
    // } else {
    return payload; // @Req 의 user로 들어감.
    // }
  }
}
