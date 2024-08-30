import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Email } from './entities/email.entity';
import * as nodemailer from 'nodemailer';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { ObjectId } from 'mongodb';

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
          cid,
        });

        // Replace src in the content with CID
        $(img).attr('src', `cid:${cid}`); 
      }
    });

    // Return modified content and images array
    return { content: $.html(), images };
  }

  async sendEmail(email: string, template: any, id?: ObjectId): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: 'in-v3.mailjet.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAILJET_API_KEY,
        pass: process.env.MAILJET_SECRET_KEY,
      },
    });

    const { content, images } = await this.processEmailContent(
      template.content,
    );

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: template.name,
      html: content,
      attachments: images.map((image) => ({
        filename: image.filename,
        path: image.path,
        cid: image.cid,
      })),
    };

    let newEmail = await this.emailRepository.findOneBy({ _id: id });


    if (!newEmail) {
      newEmail = this.emailRepository.create({
        address: email,
        template: template,
        status: 'Pending',
        retryCount: 0,
      });
    } else {
      // If entry exists, set status to 'Pending'
      newEmail.status = 'Pending';
    }

    await this.emailRepository.save(newEmail);

    try {
      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');

      // Update status to Sent
      newEmail.status = 'Sent';
      await this.emailRepository.save(newEmail);
    } catch (error) {
      console.error('Error sending email:', error);

      // Update status to Failed
      newEmail.status = 'Failed';
      newEmail.retryCount += 1; // Increment retry count
      await this.emailRepository.save(newEmail);
    }
  }
}
