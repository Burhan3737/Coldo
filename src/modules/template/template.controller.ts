import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TemplateService } from './template.service';

@Controller('templates')
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Post()
  async createTemplate(@Body() createTemplateDto: { name: string; content: string }) {
    return this.templateService.createTemplate(createTemplateDto.name, createTemplateDto.content);
  }

  @Get()
  async getAllTemplates() {
    return this.templateService.getAllTemplates();
  }

  @Put(':id')
  async updateTemplate(@Param('id') id: string, @Body() updateTemplateDto: { content: string }) {
    return this.templateService.updateTemplate(id, updateTemplateDto.content);
  }

  @Delete(':id')
  async deleteTemplate(@Param('id') id: string) {
    return this.templateService.deleteTemplate(id);
  }
}
