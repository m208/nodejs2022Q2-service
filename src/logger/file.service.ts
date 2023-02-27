import { HttpException, HttpStatus } from '@nestjs/common';
import { access } from 'fs';
import { mkdir, appendFile } from 'fs/promises';
import * as path from 'path';

export class FilesService {
  fileDate: string;
  dir = './logs';

  constructor() {
    this.getCurrentDateString();
  }

  getCurrentDateString() {
    this.fileDate = new Date().toISOString().replace(/:/g, '-');
  }

  async writeToFile(message: string) {
    try {
      access(this.dir, async (err) => {
        if (err) {
          await mkdir(path.resolve(this.dir));
        }
      });

      await appendFile(
        path.resolve(this.dir, `${this.fileDate}.log`),
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
