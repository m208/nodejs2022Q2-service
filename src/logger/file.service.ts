import { HttpException, HttpStatus } from '@nestjs/common';
import { access } from 'fs';
import { mkdir, appendFile, stat } from 'fs/promises';
import * as path from 'path';

export class FilesService {
  fileDate: string;
  dir = './LOGS';

  constructor() {
    this.getCurrentDateString();
  }

  getCurrentDateString() {
    this.fileDate = new Date().toISOString().replace(/:/g, '-');
  }

  async writeToErrorsFile(message: string) {
    await this.writeToFile(message, path.resolve(this.dir, 'ERRORS'));
  }

  async writeToFile(message: string, dir = this.dir) {
    try {
      access(path.resolve(dir), async (err) => {
        if (err) {
          await mkdir(path.resolve(dir));
        }
      });

      await appendFile(
        path.resolve(dir, `${this.fileDate}.log`),
        `\n${message}`,
      );

      try {
        const fileStats = await stat(path.resolve(dir, `${this.fileDate}.log`));
        if (fileStats.size > +process.env.LOG_FILE_MAX_SIZE) {
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
