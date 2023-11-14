import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { BadRequestException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateFileDto } from './apis/blog/dto/file.create.dto';

export class AwsService {
  private readonly awsS3: S3Client;
  private readonly AWS_S3_BUCKET_NAME: string;
  constructor() {
    this.awsS3 = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_KEY,
      },
      region: process.env.AWS_S3_BUCKET_REGION,
    });
    this.AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME;
  }

  async upLoadFilesToS3(
    folder: string,
    userEmail: string,
    file: CreateFileDto,
  ) {
    try {
      console.log(file);

      const emailFirst = userEmail.split('@')[0];
      const fileList = file['originalname'].split('.');
      const key = `${folder}/${emailFirst}_${uuidv4()}.${
        fileList[fileList.length - 1]
      }`;

      const imgUpload = new Upload({
        client: this.awsS3,
        params: {
          Bucket: this.AWS_S3_BUCKET_NAME,
          Key: key,
          Body: file['buffer'],
        },
      });
      const result = await imgUpload.done();

      const imgUrl = result['Location'];

      return imgUrl;
    } catch (error) {
      throw new BadRequestException(`File Upload failed : ${error.message}`);
    }
  }

  async deleteS3File(folder: string, key: object) {
    try {
      const imgUrl = key['image'].split('/').pop(); // image_url만 뽑기

      const imgKey = `${folder}/${imgUrl}`;

      const deleteIgmObject = new DeleteObjectCommand({
        Bucket: this.AWS_S3_BUCKET_NAME,
        Key: imgKey,
      });

      const result = await this.awsS3.send(deleteIgmObject);

      return result;
    } catch (error) {
      throw new BadRequestException(`File delete failed ${error.message}`);
    }
  }
}
