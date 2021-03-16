import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { genSalt, hash } from 'bcrypt';

import { User } from '../users/users/user.entity';
import { Permission } from '../users/permissions/permission.entity'

export default class SetupRolesAndPermissions implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(Permission)
      .values([
        { name: 'Permission_View' },
        { name: 'Role_View' },
        { name: 'Role_Create' },
        { name: 'Role_Edit' },
        { name: 'Role_Delete' },
        { name: 'User_View' },
        { name: 'User_Create' },
        { name: 'User_Edit' },
        { name: 'User_Delete' },
      ])
      .execute();


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
