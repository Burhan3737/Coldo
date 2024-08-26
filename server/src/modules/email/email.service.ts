import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  async sendEmail(email: string, template: any): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.MAILJET_API_KEY, // Your Mailjet API key
        pass: process.env.MAILJET_SECRET_KEY, // Your Mailjet Secret key
      },
      from: process.env.EMAIL_USER,
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: template.name,
      html: template.content,
    };

    // Send the email
    try {
      await transporter.sendMail(mailOptions);
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
