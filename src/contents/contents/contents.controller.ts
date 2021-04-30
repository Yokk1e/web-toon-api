import {
  Controller,
  UseGuards,
  Post,
  Body,
  UploadedFile,
  UseInterceptors,
  Get,
  Header,
  HttpException,
  HttpStatus,
  Param,
  Delete,
  Query,
  Patch,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { editFileName } from '../../helper/image-filename.helper';

import { GetJwtUser } from '../../auths/jwts/decorator/get-jwt-user.decorator';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { JwtUser } from '../../auths/jwts/jwt.strategy';

import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { ContentQueryDto } from './dto/content-query.dto';

@ApiTags('contents')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
    }),
  )
  create(
    @Body() createContentDto: CreateContentDto,
    @UploadedFile() image: any,
    @GetJwtUser() user: JwtUser,
  ) {
    if (!image) {
      throw new HttpException('No image input', HttpStatus.BAD_REQUEST);
    }
    const { filename } = image;
    createContentDto.logUserCreate(user.userId, user.userName);

    return this.contentsService.create(createContentDto, filename);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: ContentQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.contentsService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number) {
    return this.contentsService.findOne(id);
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: number,
    @Body() updateContentDto: UpdateContentDto,
    @GetJwtUser() user: JwtUser,
  ) {
    updateContentDto.logUserUpdate(user.userId, user.userName);
    return this.contentsService.updateOne(id, updateContentDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number, @GetJwtUser() user: JwtUser) {
    return this.contentsService.deleteOne(id, user);
  }
}
