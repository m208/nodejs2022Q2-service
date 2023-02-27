import { Injectable, LoggerService } from '@nestjs/common';
import { green, yellow, red, reset } from 'src/libs/colors/colors';
import { FilesService } from './file.service';

@Injectable()
export class CustomLogger implements LoggerService {
  private fileService = new FilesService();

  private logLevels = ['log', 'error', 'warn', 'debug', 'verbose'];
  private currentLogLevel = +process.env.LOG_LEVEL;

  isFitByLevel(name: string) {
    return (
      this.logLevels.findIndex((el) => el === name) + 1 <= this.currentLogLevel
    );
  }

  async log(message: string) {
    if (!this.isFitByLevel('log')) {
      return;
    }

    console.log(`${green}LOG: ${message} ${reset}`);
    await this.fileService.writeToFile(`LOG: ${message}`);
  }

  async error(message: string) {
    if (!this.isFitByLevel('error')) {
      return;
    }

    console.log(`${red}ERR: ${message} ${reset}`);
    await this.fileService.writeToErrorsFile(`ERR: ${message}`);
  }

  async warn(message: string) {
    if (!this.isFitByLevel('warn')) {
      return;
    }

    console.log(`${yellow}WARN: ${message} ${reset}`);
    await this.fileService.writeToFile(`WARN: ${message}`);
  }

  async debug?(message: string) {
    if (!this.isFitByLevel('debug')) {
      return;
    }

    console.log('DEBUG:', message);
    await this.fileService.writeToFile(`DEBUG: ${message}`);
  }

  async verbose?(message: string) {
    if (!this.isFitByLevel('verbose')) {
      return;
    }

    console.log('VERB:', message);
    await this.fileService.writeToFile(`VERB: ${message}`);
  }
}
