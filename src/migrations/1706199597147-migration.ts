import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1706199597147 implements MigrationInterface {
    name = 'Migration1706199597147'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" BIGSERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying, "password" character varying, "createdAt" bigint NOT NULL DEFAULT '1706199598542', "updatedAt" bigint, "deletedAt" bigint, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
