import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCompagnyToInputs1570008008858 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "input" ADD "compagnyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "quote" ADD "compagnyId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "input" ADD CONSTRAINT "FK_c64155d0a90ee48740a6b2bef68" FOREIGN KEY ("compagnyId") REFERENCES "compagny"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "quote" ADD CONSTRAINT "FK_536177ceb4d1fc79f67863bfacb" FOREIGN KEY ("compagnyId") REFERENCES "compagny"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "quote" DROP CONSTRAINT "FK_536177ceb4d1fc79f67863bfacb"`);
        await queryRunner.query(`ALTER TABLE "input" DROP CONSTRAINT "FK_c64155d0a90ee48740a6b2bef68"`);
        await queryRunner.query(`ALTER TABLE "quote" DROP COLUMN "compagnyId"`);
        await queryRunner.query(`ALTER TABLE "input" DROP COLUMN "compagnyId"`);
    }

}
