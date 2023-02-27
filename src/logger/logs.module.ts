import { Module } from '@nestjs/common';
import { CustomLogger } from './logs.service';

@Module({
  providers: [CustomLogger],
  exports: [CustomLogger],
})
export class LogsModule {}
