import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'BLOG_API_VERSION: 1.0.7'; // github action test용
  }
}
