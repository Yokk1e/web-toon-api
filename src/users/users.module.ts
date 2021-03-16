import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Permission } from './permissions/permission.entity';
import { RolesService } from './roles/roles.service';
import { RolesController } from './roles/roles.controller';
import { PermissionsController } from './permissions/permissions.controller';
import { PermissionsService } from './permissions/permissions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission, Role, User])],
  controllers: [UsersController, RolesController, PermissionsController],
  providers: [UsersService, RolesService, PermissionsService],
  exports: [UsersService],
})
export class UsersModule {}
