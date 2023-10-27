import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export interface IAuthUser {
  id: string;
  email: string;
}

// 인증된 user 사용 Decorators
export const AuthUser = createParamDecorator(
  (data: any, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user: IAuthUser = { id: req.user.sub, email: req.user.email };

    return user;
  },
);
