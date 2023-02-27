import { Injectable, LoggerService } from '@nestjs/common';
import { green, yellow, red, reset } from 'src/libs/colors/colors';
import { FilesService } from './file.service';

@Injectable()
export class CustomLogger implements LoggerService {
  private fileService = new FilesService();

  async log(message: string) {
    console.log(`${green}LOG: ${message} ${reset}`);
    await this.fileService.writeToFile(`LOG: ${message}`);
  }

  async error(message: string) {
    console.log(`${red}ERR: ${message} ${reset}`);
    await this.fileService.writeToFile(`ERR: ${message}`);
  }

  async warn(message: string) {
    console.log(`${yellow}WARN: ${message} ${reset}`);
    await this.fileService.writeToFile(`WARN: ${message}`);
  }

  async debug?(message: string) {
    console.log('DEBUG:', message);
    await this.fileService.writeToFile(`DEBUG: ${message}`);
  }

  async verbose?(message: string) {
    console.log('VERB:', message);
    await this.fileService.writeToFile(`VERB: ${message}`);
  }
}
