import { Injectable ,HttpException, HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}

      async create(createUserDto: CreateUserDto): Promise<User> {
        const oldUser = await this.userRepository.findOne({
          where: { email: createUserDto.email },
        });
    
        if (oldUser)
          throw new HttpException('Email is already exist', HttpStatus.BAD_REQUEST);
    
        const salt = await genSalt(8);
        const password = await hash(createUserDto.password, salt);
        return this.userRepository.save({ ...createUserDto, password });
      }
}
