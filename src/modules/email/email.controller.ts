import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('/send')
  async sendEmail(@Body() sendEmailDto: { emails: string[]; template: string }) {
    for (const email of sendEmailDto.emails) {
      await this.emailService.sendEmail(email, sendEmailDto.template);
    }
  }
}
