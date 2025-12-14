import { Injectable, Logger } from '@nestjs/common';
import { CloudinaryService as Cloundinary } from 'nestjs-cloudinary';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);
  constructor(private readonly cloudinary: Cloundinary) {}

  async upload(file: Express.Multer.File) {
    try {
      return await this.cloudinary.uploadFile(file);
    } catch (err) {
      this.logger.error('Error uploading image', err);
      throw err;
    }
  }
}
