import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Template } from './entities/template.entity';

@Injectable()
export class TemplateService {
  constructor(
    @InjectRepository(Template)
    private templateRepository: Repository<Template>,
  ) {}

  async createTemplate(name: string, content: string): Promise<Template> {
    const newTemplate = this.templateRepository.create({ name, content });
    return this.templateRepository.save(newTemplate);
  }

  async getAllTemplates(): Promise<Template[]> {
    return this.templateRepository.find();
  }

  async updateTemplate(id: string, content: string): Promise<Template> {
    await this.templateRepository.update(id, { content });
    return this.templateRepository.findOneBy({ id });
  }

  async deleteTemplate(id: string): Promise<void> {
    await this.templateRepository.delete(id);
  }
}
