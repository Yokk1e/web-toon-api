import {
  Controller,
  UseGuards,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Header,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { CatagoriesService } from './catagories.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

import { GetJwtUser } from '../../auths/jwts/decorator/get-jwt-user.decorator';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { JwtUser } from '../../auths/jwts/jwt.strategy';
import { CreateCatagoryDto } from './dto/create-catagory.dto';
import { UpdateCatagoryDto } from './dto/update-catagory.dto'

@ApiTags('catagories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('catagories')
export class CatagoriesController {
  constructor(private readonly catagoriesService: CatagoriesService) {}

  @Post("/createCatagory")
  create(
    @Body() createCatagoryDto: CreateCatagoryDto,
    @GetJwtUser() user: JwtUser,
  ) {
    createCatagoryDto.logUserCreate(user.userId, user.userName);
    return this.catagoriesService.create(createCatagoryDto);
  }
  
  @Get('/getCat/:id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.catagoriesService.findOne(id);
  }

  @Get('/getAllCatagories')
  findAll() {
    return this.catagoriesService.findAll();
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number, @GetJwtUser() user: JwtUser) {
    return this.catagoriesService.deleteOne(id, user);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateCatagoryDto: UpdateCatagoryDto,
    @GetJwtUser() user: JwtUser,
  ) {
    updateCatagoryDto.logUserUpdate(user.userId, user.userName);
    return this.catagoriesService.updateOne(id, updateCatagoryDto);
  }
}
