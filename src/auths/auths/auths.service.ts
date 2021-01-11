import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users/users.service';

@Injectable()
export class AuthsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
      ) {}

      async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
    
        if (user && (await compare(pass, user.password))) {
          const { password, ...result } = user;
    
          return result;
        }
    
        return null;
      }

      async login(user: any) {
        const payload = {
          sub: user.id,
          name: user.email,
        };
    
        return { accessToken: this.jwtService.sign(payload) };
      }
}
