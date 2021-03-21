import { ManagedQueryDto } from '../../../managed-entities/managed-entities/dto/managed-query.dto';

export class UserQueryDto extends ManagedQueryDto {
  public toWhereClause(): any {
    return super.toWhereClause();
  }
}
