import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/users/users.service';
import { Permission } from '../../users/permissions/permission.entity';

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
      permissions: user.role.permissions.map(
        (permission: Permission) => permission.name,
      ),
    };

    return { accessToken: this.jwtService.sign(payload) };
  }
}
