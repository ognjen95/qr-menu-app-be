import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { randomUUID } from 'crypto';
import { PresignedUrlReturnModel } from '@application/common/types/file-upload.types';

interface IFileServiceInterface {
  upload(file: File): Promise<string>;
  getPresignedUrl(fileName: string): Promise<PresignedUrlReturnModel | null>;
  getPresignedUrls(
    fileNames: Array<string>,
  ): Promise<Array<PresignedUrlReturnModel | null>>;
  getDownloadLink(fileId: string): Promise<string>;
}
@Injectable()
export class FileService implements IFileServiceInterface {
  private client = new S3Client({
    region: 'eu-central-1',
    // region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  private bucketNamePublic = 'qr-menu-public';
  // private bucketNamePublic = process.env.AWS_BUCKET_NAME;

  async upload(file: File) {
    const Key = this.generateFileName(file.name);

    const command = new PutObjectCommand({
      Bucket: this.bucketNamePublic,
      Body: file,
      Key,
    });

    await this.client.send(command);

    return Key;
  }

  async getPresignedUrl(
    fileName: string,
  ): Promise<PresignedUrlReturnModel> | null {
    const Key = this.generateFileName(fileName);

    const command = new PutObjectCommand({
      Bucket: this.bucketNamePublic,
      Key,
    });

    if (!fileName) return null;

    const presignedUrl = await getSignedUrl(this.client, command, {
      expiresIn: 50000,
    });

    return {
      link: presignedUrl,
      id: Key,
    };
  }

  async getDownloadLink(fileId: string): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.bucketNamePublic,
      Key: fileId,
    });

    const signedDownoadLink = await getSignedUrl(this.client, command);
    return signedDownoadLink;
  }

  async getPresignedUrls(
    fileNames: Array<string>,
  ): Promise<Array<PresignedUrlReturnModel | null>> {
    const presignedUrls = await Promise.all(
      fileNames.map(async (fileName) => {
        return this.getPresignedUrl(fileName);
      }),
    );

    return presignedUrls;
  }

  private generateFileName(fileName: string): string {
    return `${randomUUID()}-${fileName.toLowerCase()}`;
  }
}
