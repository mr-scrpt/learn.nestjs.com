import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  Inject,
  UsePipes,
  ValidationPipe,
  SetMetadata,
} from '@nestjs/common';
import { Request } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/public.decorator';
import { resolve } from 'path';
import { ParseIntPipe } from 'src/common/pipes/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiTags, ApiForbiddenResponse } from '@nestjs/swagger';

@ApiTags('coffees')
@UsePipes(ValidationPipe) // Одно из мест, на уровне контроллера
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesServices: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    /*  console.log('-> coffee controller instas');
    console.log('-> my req', request); */
  }

  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(ValidationPipe) // Одно из мест, на уровне метоода
  @Public()
  @Get()
  async findeAll(
    @Protocol('https test data') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('-> protocol', protocol);
    //await new Promise(resolve => setTimeout(resolve, 9000));
    return this.coffeesServices.findAll(paginationQuery);
  }

  @Get(':id')
  findeOne(@Param('id', ParseIntPipe) id: number) {
    console.log('-> id', id);
    return this.coffeesServices.findOne('' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    return this.coffeesServices.create(createCoffeeDto);
  }

  @Patch(':id')
  // Одно из мест, на уровне декоратора @Body
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeesServices.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesServices.remove(id);
  }
}
