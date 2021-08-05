import {MigrationInterface, QueryRunner} from "typeorm";

export class createSchema1628065915624 implements MigrationInterface {
    name = 'createSchema1628065915624'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`todos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`content\` varchar(255) NOT NULL, \`isCompleted\` tinyint NOT NULL DEFAULT 0, \`tagId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todoApp\`.\`tags\` (\`id\` int NOT NULL AUTO_INCREMENT, \`uuid\` char(36) NOT NULL, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todos\` ADD CONSTRAINT \`FK_9ab1a77aa7cac06a37c65f3860f\` FOREIGN KEY (\`tagId\`) REFERENCES \`todoApp\`.\`tags\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todoApp\`.\`todos\` DROP FOREIGN KEY \`FK_9ab1a77aa7cac06a37c65f3860f\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`tags\``);
        await queryRunner.query(`DROP TABLE \`todoApp\`.\`todos\``);
    }

}
