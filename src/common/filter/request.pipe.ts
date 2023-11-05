import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.data === 'parentComment_id') {
      return value;
    }
    if (value === undefined) {
      throw new BadRequestException('Invalid Parameter');
    }

    return value;
  }
}
