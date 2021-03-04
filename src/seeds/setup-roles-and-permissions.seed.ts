import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from '../users/users/user.entity';

export default class SetupRolesAndPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const salt = await genSalt(Number(process.env.SALT_ROUND));
    const password = await hash(process.env.DEFAULT_ADMIN_PASSWORD, salt);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        { email: process.env.DEFAULT_ADMIN_EMAIL, password, userName: 'admin' },
      ])
      .execute();
  }
}
