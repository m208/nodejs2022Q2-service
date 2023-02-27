import { HttpException, HttpStatus } from '@nestjs/common';
import { access } from 'fs';
import { mkdir, appendFile, stat } from 'fs/promises';

export class FilesService {
  fileDate: string;

  constructor() {
    this.getCurrentDateString();
  }

  getCurrentDateString() {
    this.fileDate = new Date().toISOString().replace(/:/g, '-');
  }

  async writeToFile(dir: string, message: string) {
    try {
      access(dir, async (err) => {
        if (err) {
          await mkdir('./logs');
        }
      });

      const file = `./logs/${this.fileDate}.log`;
      await appendFile(file, `\n${message}`);

      try {
        const statsObj = await stat(file);
        if (statsObj.size > +process.env.LOG_FILE_MAX_SIZE) {
          this.getCurrentDateString();
        }
      } catch (e) {
        throw new HttpException(
          'Error reading log file',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    } catch (e) {
      throw new HttpException(
        'Error writing log file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
