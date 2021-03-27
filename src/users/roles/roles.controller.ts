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
import { RolesService } from './roles.service';

import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';

@ApiTags('roles')
@Controller('roles')
export class RolesController {
constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Header('Cache-Control', 'no-cache, no-store')
  findAll(@Query() query: RoleQueryDto) {
    const options = { limit: query.limit, page: query.page };

    return this.rolesService.findAll(query, options);
  }

  @Patch(':id')
  updateOne(@Param('id') id: number,@Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.updateOne(id, updateRoleDto);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: number) {
    return this.rolesService.deleteOne(id);
  }

}
