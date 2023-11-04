import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationUser11698684857449 implements MigrationInterface {
    name = 'MigrationUser11698684857449'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(250) NOT NULL, \`dt_nascimento\` date NOT NULL, \`email\` varchar(250) NOT NULL, \`password\` varchar(250) NOT NULL, \`cellphone\` varchar(11) NOT NULL, \`whatsapp\` int NOT NULL, \`phone\` varchar(10) NOT NULL, \`cep\` int NOT NULL, \`adress\` varchar(250) NOT NULL, \`level\` int NOT NULL, \`status\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
