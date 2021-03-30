import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import {
  IPaginationOptions,
  Pagination,
  paginate,
} from 'nestjs-typeorm-paginate';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { Role } from '../roles/role.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUserClientDto } from './dto/create-user-client.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserQueryDto } from './dto/user-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.isEmailExists(createUserDto.email);
    const role = await this.isRoleExists(createUserDto.role);

    const salt = await genSalt(+this.configService.get('SALT_ROUND'));
    const password = await hash(createUserDto.password, salt);

    return this.userRepository.save({ ...createUserDto, password, role });
  }

  async createByClient(
    createUserClientDto: CreateUserClientDto,
  ): Promise<User> {
    await this.isEmailExists(createUserClientDto.email);
    const role = await this.isRoleExists(
      +this.configService.get('DEFAULT_ROLE_ID'),
    );

    const salt = await genSalt(+this.configService.get('SALT_ROUND'));
    const password = await hash(createUserClientDto.password, salt);

    return this.userRepository.save({ ...createUserClientDto, password, role });
  }

  private async isRoleExists(roleId: number): Promise<Role> {
    const role = await this.roleRepository.findOne(roleId);

    if (!role)
      throw new HttpException('Role is not found', HttpStatus.BAD_REQUEST);

    return role;
  }

  private async isEmailExists(email: string): Promise<User> {
    const oldUser = await this.userRepository.findOne({
      where: { email },
    });

    if (oldUser)
      throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);

    return oldUser;
  }

  findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({
      where: { email },
      relations: ['role', 'role.permissions'],
    });
  }

  findAll(
    query: UserQueryDto,
    options: IPaginationOptions,
  ): Promise<Pagination<User>> {
    const users = this.userRepository.createQueryBuilder('user');
    users.orderBy(`user.${query.key}`, query.orderType);

    if (query.search) {
      users.where('user.userName like :search', {
        search: `%${query.search}%`,
      });
    }

    users.leftJoinAndSelect('user.role', 'role');

    return paginate<User>(users, options);
  }

  async findOne(id: number, query: UserQueryDto): Promise<User> {
    return this.userRepository.findOneOrFail(id, {
      relations: ['role'],
    });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneOrFail(id);

    const role = await this.roleRepository.findOneOrFail(updateUserDto.role);

    return this.userRepository.save({ ...user, role });
  }

  async deleteOne(id: number) {
    return this.userRepository.softDelete(id);
  }
}
