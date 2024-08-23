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
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: template.name,
      html: template.content,
    };

    await transporter.sendMail(mailOptions);

    const newEmail = this.emailRepository.create({
      address: email,
      template: template,
    });
    await this.emailRepository.save(newEmail);
  }
}
