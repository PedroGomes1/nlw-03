import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class addIspendingToOrphanages1603546226055 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'orphanages',
            new TableColumn({
              name: 'is_pending',
              type: 'boolean',
              isNullable: true,
            }),
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('orphanages', 'is_pending');
    }

}
