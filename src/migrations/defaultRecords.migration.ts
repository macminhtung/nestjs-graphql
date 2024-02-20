import { MigrationInterface, QueryRunner } from 'typeorm';
import {
  DEFAULT_ROLES,
  DEFAULT_SCOPES,
  DEFAULT_ROLE_SCOPES,
  DEFAULT_ADMIN_USER,
} from 'common/constants';
import { EntityEnum } from 'common/enums';

export class DefaultRecordsMigration_1612199991111
  implements MigrationInterface
{
  name: 'default-records';
  public async up(queryRunner: QueryRunner): Promise<any> {
    const DEFAULT_ROLES_VALUES = Object.values(DEFAULT_ROLES);
    const DEFAULT_SCOPES_VALUES = Object.values(DEFAULT_SCOPES);

    // INSERT DEFAULT_ROLES
    await queryRunner.query(`
      INSERT INTO "${EntityEnum.ROLE}" ("id", "name", "is_default") VALUES
      ${DEFAULT_ROLES_VALUES.map(
        (item) => `(${item.id}, '${item.name}', TRUE)`,
      )}
    `);

    // INSERT DEFAULT_SCOPES
    await queryRunner.query(`
      INSERT INTO "${EntityEnum.SCOPE}" ("id", "name", "description") VALUES
      ${DEFAULT_SCOPES_VALUES.map(
        (item) => `(${item.id}, '${item.name}', '${item.description}')`,
      )}
    `);

    // INSERT DEFAULT_ROLE_SCOPE
    await queryRunner.query(`
      INSERT INTO "${EntityEnum.ROLE_SCOPE}" ("${EntityEnum.ROLE}_id", "${
      EntityEnum.SCOPE
    }_id") VALUES
      ${DEFAULT_ROLE_SCOPES.map((item) => `(${item.roleId}, ${item.scopeId})`)}
    `);

    // INSERT DEFAULT_ADMIN_USER
    const { id, email, displayName } = DEFAULT_ADMIN_USER;
    await queryRunner.query(`
      INSERT INTO "${EntityEnum.USER}" 
      ("id", "email", "display_name") VALUES ('${id}', '${email}', '${displayName}')`);

    // INSERT ADMIN ROLE FOR DEFAULT_ADMIN_USER
    await queryRunner.query(`
      INSERT INTO "${EntityEnum.USER_ROLE}"
      ("user_id", "role_id") VALUES ('${id}', ${DEFAULT_ROLES.ADMIN.id})`);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(`DROP TABLE "${EntityEnum.ROLE}"`);
    await queryRunner.query(`DROP TABLE "${EntityEnum.SCOPE}"`);
    await queryRunner.query(`DROP TABLE "${EntityEnum.ROLE_SCOPE}"`);
  }
}
