import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
const mailjet = require('node-mailjet');

@Injectable()
export class EmailService {
  private mailjetClient: any;

  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {
    // Initialize Mailjet client
    this.mailjetClient = mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY,
    );
  }

  async sendEmail(email: string, template: any): Promise<void> {
    const request = this.mailjetClient
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.EMAIL_USER,
              Name: 'Your Name or Company',
            },
            To: [
              {
                Email: email,
              },
            ],
            Subject: template.name,
            HTMLPart: template.content,
          },
        ],
      });

    try {
      await request;
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }

    // Save the email information to the database
    const newEmail = this.emailRepository.create({
      address: email,
      template: template,
    });
    await this.emailRepository.save(newEmail);
  }
}
