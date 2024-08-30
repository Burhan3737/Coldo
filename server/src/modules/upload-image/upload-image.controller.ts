import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express'; // Correct path for FileInterceptor
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('upload-image')
export class UploadImageController {
  @Post()
  @UseInterceptors(
    FileInterceptor('upload', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, uniqueSuffix + extname(file.originalname));
        },
      }),
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    // Return the URL to the uploaded file
    return {
      url: `http://localhost:3000/uploads/${file.filename}`,
    };
  }
}
