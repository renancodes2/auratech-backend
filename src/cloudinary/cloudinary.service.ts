import { Injectable } from '@nestjs/common';
import {
  v2 as cloudinary,
  UploadApiResponse,
  DeleteApiResponse,
} from 'cloudinary';
import { CloudinaryResponse } from './cloudinary-response.interface';
import * as streamifier from 'streamifier';
import { Buffer } from 'buffer';

@Injectable()
export class CloudinaryService {
  async deleteFile(publicId: string): Promise<void> {
    try {
      const result: DeleteApiResponse = (await cloudinary.uploader.destroy(
        publicId,
      )) as DeleteApiResponse;

      if (result.http_code >= 200 && result.http_code < 300) {
        if (result.message.toLowerCase() === 'not found') {
          console.warn(
            `Cloudinary resource ${publicId} was not found, but we continue (Rollback success).`,
          );
          return;
        }

        console.log(`Successfully deleted Cloudinary resource: ${publicId}`);
        return;
      } else {
        throw new Error(
          `Failed to delete file from Cloudinary. HTTP Code: ${result.http_code}. Message: ${result.message}`,
        );
      }
    } catch (error) {
      console.error(
        `Error during Cloudinary file deletion for ${publicId}:`,
        error,
      );
      throw error;
    }
  }

  uploadFile(file: Express.Multer.File): Promise<CloudinaryResponse> {
    const uploadedFile: Express.Multer.File = file;
    const fileBuffer: Buffer = uploadedFile.buffer;

    return new Promise<CloudinaryResponse>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'auratech_products',
        },
        (error: Error | undefined, result: UploadApiResponse | undefined) => {
          if (error) {
            return reject(error);
          }
          if (!result) {
            return reject(new Error('Cloudinary response was empty.'));
          }

          resolve(result);
        },
      );
      streamifier.createReadStream(fileBuffer).pipe(uploadStream);
    });
  }
}
