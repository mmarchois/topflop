import {MigrationInterface, QueryRunner} from "typeorm";

export class CompagnyVoucher1570607325020 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "compagny" ADD "voucher" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "compagny" DROP COLUMN "voucher"`);
    }

}
