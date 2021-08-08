import {MigrationInterface, QueryRunner} from "typeorm";

export class createSchema1628329299950 implements MigrationInterface {
    name = 'createSchema1628329299950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`content\` varchar(255) NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`todototags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`todoId\` int NOT NULL, \`tagId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todototags\` ADD CONSTRAINT \`FK_e7bea70309ff668bcef7397bb88\` FOREIGN KEY (\`tagId\`) REFERENCES \`todoApp\`.\`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todototags\` ADD CONSTRAINT \`FK_3ef27ddc7e6746ed241bfe07209\` FOREIGN KEY (\`todoId\`) REFERENCES \`todoApp\`.\`todos\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todototags\` DROP FOREIGN KEY \`FK_3ef27ddc7e6746ed241bfe07209\``);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todototags\` DROP FOREIGN KEY \`FK_e7bea70309ff668bcef7397bb88\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`tags\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`todototags\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`todos\``);
    }

}
