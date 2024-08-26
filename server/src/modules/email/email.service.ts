import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import * as nodemailer from 'nodemailer';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email)
    private emailRepository: Repository<Email>,
  ) {}

  private async processEmailContent(content: string) {
    const $ = cheerio.load(content);
    const images = [];

    $('img').each((i, img) => {
      const src = $(img).attr('src');
      if (src) {
        const filename = path.basename(src);
        const cid = `image${i + 1}`;

        // Add image details to the array
        images.push({
          filename,
          path: src,
          cid
        });

        // Replace src in the content with CID
        $(img).attr('src', `cid:${cid}`);
      }
    });

    // Return modified content and images array
    return { content: $.html(), images };
  }

  async sendEmail(email: string, template: any): Promise<void> {
    // Initialize transporter
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
      },
      from: process.env.EMAIL_USER,
    });

    // Process email content
    const { content, images } = await this.processEmailContent(template.content);

    // Set up mail options with inline attachments
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: template.name,
      html: content,
      attachments: images.map(image => ({
        filename: image.filename,
        path: image.path,
        cid: image.cid
      }))
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
