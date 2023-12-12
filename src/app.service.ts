import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'GITHUB_ACTIONS_BLOG_API_VERSION: 1.0.24'; // github action test용
  }
}
