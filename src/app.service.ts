import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'BLOG_API_VERSION: 1.0.8'; // github action test용
  }
}
