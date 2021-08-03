import {MigrationInterface, QueryRunner} from "typeorm";

export class createSchema1627969798814 implements MigrationInterface {
    name = 'createSchema1627969798814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`content\` varchar(255) NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`todotags\` (\`todo_id\` int NOT NULL, \`tag_id\` int NOT NULL, INDEX \`IDX_3a9de518a40e7fab424930f97a\` (\`todo_id\`), INDEX \`IDX_b292457493b00d48b5c45d86a1\` (\`tag_id\`), PRIMARY KEY (\`todo_id\`, \`tag_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todotags\` ADD CONSTRAINT \`FK_3a9de518a40e7fab424930f97a6\` FOREIGN KEY (\`todo_id\`) REFERENCES \`todoApp\`.\`todos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todotags\` ADD CONSTRAINT \`FK_b292457493b00d48b5c45d86a12\` FOREIGN KEY (\`tag_id\`) REFERENCES \`todoApp\`.\`tags\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todotags\` DROP FOREIGN KEY \`FK_b292457493b00d48b5c45d86a12\``);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todotags\` DROP FOREIGN KEY \`FK_3a9de518a40e7fab424930f97a6\``);
        await queryRunner.query(`DROP INDEX \`IDX_b292457493b00d48b5c45d86a1\` ON \`todoApp\`.\`todotags\``);
        await queryRunner.query(`DROP INDEX \`IDX_3a9de518a40e7fab424930f97a\` ON \`todoApp\`.\`todotags\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`todotags\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`todos\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`tags\``);
    }

}
