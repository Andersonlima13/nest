import { Body, Inject, Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class QuestionsService {

  @Inject()
  private readonly prisma: PrismaService;

  async create(@Body() createQuestionDto: CreateQuestionDto, userId: number) {
    return await this.prisma.questions.create({ data: { ...createQuestionDto, userId } });
  }

  async findAll() {
    return await this.prisma.questions.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.questions.findUnique({ where: { id } });
  }

  update(id: number, updateQuestionDto: UpdateQuestionDto) {
    return `This action updates a #${id} question`;
  }

  async remove(id: number) {
    return `This action removes a #${id} question`;
  }
}
