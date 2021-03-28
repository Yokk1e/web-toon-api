import { ManagedQueryDto } from '../../../managed-entities/managed-entities/dto/managed-query.dto';

export class RoleQueryDto extends ManagedQueryDto {
  public toWhereClause(): any {
    return super.toWhereClause();
  }
}
