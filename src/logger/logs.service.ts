import { Injectable, LoggerService } from '@nestjs/common';
import { green, yellow, red, reset } from 'src/libs/colors/colors';

@Injectable()
export class CustomLogger implements LoggerService {
  log(message: string) {
    console.log(`${green}LOG: ${message} ${reset}`);
  }

  error(message: string) {
    console.log(`${red}ERR: ${message} ${reset}`);
  }

  warn(message: string) {
    console.log(`${yellow}WARN: ${message} ${reset}`);
  }

  debug?(message: string) {
    console.log('DEBUG:', message);
  }

  verbose?(message: string) {
    console.log('VERB:', message);
  }
}
