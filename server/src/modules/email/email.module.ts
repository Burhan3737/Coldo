import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { Email } from './entities/email.entity';
import { EmailRetryService } from './email-retry.service';

@Module({
  imports: [TypeOrmModule.forFeature([Email])],
  providers: [EmailService, EmailRetryService],
  controllers: [EmailController],
})
export class EmailModule {}
