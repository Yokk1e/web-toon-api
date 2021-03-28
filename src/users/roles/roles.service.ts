import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Role } from '../roles/role.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleQueryDto } from './dto/role-query.dto';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    const oldRole = await this.roleRepository.findOne({
      where: { name: createRoleDto.name },
    });

    if (oldRole)
      throw new HttpException('Role is already exist', HttpStatus.BAD_REQUEST);

    return this.roleRepository.save({ ...createRoleDto });
  }

  findAll(
    query: RoleQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<Role>> {
    const roles = this.roleRepository.createQueryBuilder('role');
    roles.orderBy(`role.${query.key}`, query.orderType);

    if (query.search) {
      roles.andWhere('role.name like :search', {
        search: `%${query.search}%`,
      });
    }

    return paginate<Role>(roles, options);
  }

  async updateOne(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const oldRole = await this.roleRepository.findOne({
      where: { name: updateRoleDto.name },
    });

    if (oldRole)
      throw new HttpException('Role is already exist', HttpStatus.BAD_REQUEST);

    const role = await this.roleRepository.findOneOrFail(id);

    return this.roleRepository.save({ ...role, ...updateRoleDto });
  }

  async deleteOne(id: number) {
    const user = await this.roleRepository.findOneOrFail(id);
    user.softDelete();

    return this.roleRepository.save(user);
  }
}
