import { MigrationInterface, QueryRunner } from "typeorm"

export class User21698856213440 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user ADD COLUMN emailToken varchar(400) AFTER email`)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE user DROP COLUMN emailToken`)
    }

}
