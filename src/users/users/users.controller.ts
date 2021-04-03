import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Header,
  Query,
  UseInterceptors,
  ClassSerializerInterceptor,
  Delete,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auths/jwts/jwt-auth.guard';
import { UsersService } from './users.service';

import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';

@ApiTags('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @Post('/client')
  createByClient(@Body() createUserClientDto: CreateUserClientDto) {
    return this.usersService.createByClient(createUserClientDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: UserQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.usersService.findAll(query, options);
  }

  @Get(':id')
  @Header('Cache-Control', 'no-cache, no-store')
  findOne(@Param('id') id: number, @Query() query: UserQueryDto) {
    return this.usersService.findOne(id, query);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number, @Body() updateRoleDto: UpdateUserDto) {
    return this.usersService.updateOne(id, updateRoleDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.usersService.deleteOne(id);
  }
}
