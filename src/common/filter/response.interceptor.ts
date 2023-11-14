import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T[];
  // statusCode: number;
  success: boolean;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        // // response 성공 시 반환하면 안되는 값 제거
        if (Object.keys(data).includes('password')) {
          delete data.password;
        }
        // const statusCode = context.switchToHttp().getResponse().statusCode;
        return { success: true, data: new Array(data) };
        // return { success: true, data: data };
      }),
    );
  }
}
