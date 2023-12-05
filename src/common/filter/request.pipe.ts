import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class RequestValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log('value', value);
    console.log('metadata.data', metadata.data);

    const limitb = 4000000; // 4MB

    if (metadata.data === 'parentComment_id') {
      return value;
    }
    if (value === undefined) {
      throw new BadRequestException('Invalid Parameter');
    }

    // if (value.size >= limitb)
    //   throw new BadRequestException('Capacity exceeded.');

    return value;
  }
}
