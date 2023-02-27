import { HttpException, HttpStatus } from '@nestjs/common';
import { access } from 'fs';
import { mkdir, appendFile } from 'fs/promises';
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
    } catch (e) {
      throw new HttpException(
        'Error writing log file',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
