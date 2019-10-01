import {MigrationInterface, QueryRunner} from "typeorm";

export class InitTopFlop1569935733841 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "compagny" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_0995bfe6289d6f1f2d6c94f94e7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "apiToken" text, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "currentCompagnyId" uuid, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "api-token" ON "user" ("apiToken") `);
        await queryRunner.query(`CREATE TYPE "input_type_enum" AS ENUM('flop', 'top')`);
        await queryRunner.query(`CREATE TABLE "input" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "type" "input_type_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "authorId" uuid NOT NULL, "addedById" uuid NOT NULL, CONSTRAINT "PK_a1deaa2fcdc821329884ad43931" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "quote" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "sentence" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "authorId" uuid NOT NULL, "addedById" uuid NOT NULL, CONSTRAINT "PK_b772d4cb09e587c8c72a78d2439" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "user_compagny_role_enum" AS ENUM('admin', 'user')`);
        await queryRunner.query(`CREATE TABLE "user_compagny" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "role" "user_compagny_role_enum" NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "compagnyId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_5e05399b1f32c065736f96e72d3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_c29832405babcac8d3356790f61" FOREIGN KEY ("currentCompagnyId") REFERENCES "compagny"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_5e88d3759253690fb225b56af66" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_5ac89d0ddeedacc09c6c62d5090" FOREIGN KEY ("addedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_36e9a62b8710aa5069bacd8c601" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_9a8c76af15c1a32eeddcd694831" FOREIGN KEY ("addedById") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_compagny" ADD CONSTRAINT "FK_440e044c8e59714925dd0d5405c" FOREIGN KEY ("compagnyId") REFERENCES "compagny"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_compagny" ADD CONSTRAINT "FK_32a7893371c02113d17218636f8" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user_compagny" DROP CONSTRAINT "FK_32a7893371c02113d17218636f8"`);
        await queryRunner.query(`ALTER TABLE "user_compagny" DROP CONSTRAINT "FK_440e044c8e59714925dd0d5405c"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_9a8c76af15c1a32eeddcd694831"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_36e9a62b8710aa5069bacd8c601"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_5ac89d0ddeedacc09c6c62d5090"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_5e88d3759253690fb225b56af66"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c29832405babcac8d3356790f61"`);
        await queryRunner.query(`DROP TABLE "user_compagny"`);
        await queryRunner.query(`DROP TYPE "user_compagny_role_enum"`);
        await queryRunner.query(`DROP TABLE "quote"`);
        await queryRunner.query(`DROP TABLE "input"`);
        await queryRunner.query(`DROP TYPE "input_type_enum"`);
        await queryRunner.query(`DROP INDEX "api-token"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "compagny"`);
    }

}
