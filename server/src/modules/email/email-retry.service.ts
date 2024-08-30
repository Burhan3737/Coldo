import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan } from 'typeorm';
import { Email } from './entities/email.entity';
import { EmailService } from './email.service';

@Injectable()
export class EmailRetryService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
    private readonly emailService: EmailService,
  ) {}

  // EmailRetryService

  @Cron('* * * * *')
  async retryFailedEmails() {
    // Find failed emails with retryCount less than 5
    const failedEmails = await this.emailRepository.find({
      where: {
        status: 'Failed',
        retryCount: { $lt: 5 }, // Use LessThan operator for TypeORM
      },
    });

    if (failedEmails && failedEmails.length > 0) {
      console.log('Running email retry service');
    }

    for (const email of failedEmails) {
      // Exponential backoff delay (e.g., 2^retryCount * 1000 milliseconds)
      const delay = Math.pow(2, email.retryCount) * 1000;

      setTimeout(async () => {
        try {
          // Pass the id to the sendEmail method
          await this.emailService.sendEmail(
            email.address,
            email.template,
            email._id,
          );
        } catch (error) {
          console.error('Error in retry email service:', error);
        }
      }, delay);
    }
  }
}
