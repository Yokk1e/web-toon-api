export class ManagedLogDto {
  readonly createdBy: number;
  readonly createdUser: string;

  readonly updatedBy: number;
  readonly updatedUser: string;

  readonly deletedBy: number;
  readonly deletedUser: string;

  logUserCreate(userId: number, userName: string) {
    this.logUser(userId, userName, 'createdBy', 'createdUser');
  }

  logUserUpdate(userId: number, userName: string) {
    this.logUser(userId, userName, 'updatedBy', 'updatedUser');
  }

  private logUser(
    userId: number,
    userName: string,
    updateKey: string,
    updateName: string,
  ) {
    this[updateKey] = userId;
    this[updateName] = userName;

    for (const key in this) {
      if (this[key] instanceof ManagedLogDto) {
        ((this[key] as unknown) as ManagedLogDto).logUser(
          userId,
          userName,
          updateKey,
          updateName,
        );
      }

      if (this[key] instanceof Array) {
        for (const e of (this[key] as unknown) as Array<any>) {
          if (e instanceof ManagedLogDto) {
            e.logUser(userId, userName, updateKey, updateName);
          }
        }
      }
    }
  }
}
