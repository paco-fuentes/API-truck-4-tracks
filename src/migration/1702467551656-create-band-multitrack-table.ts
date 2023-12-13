import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBandMultitrackTable1702467551656
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "band_multitrack",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "band_id",
            type: "int",
          },
          {
            name: "project_title",
            type: "varchar",
            length: "127",
            isNullable: true,
          },
          {
            name: "img_url",
            type: "varchar",
            length: "255",
            default: '"../img/def-multitrack-img.jpeg"',
          },
          {
            name: "is_active",
            type: "boolean",
            default: true,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
        foreignKeys: [
          {
            columnNames: ["band_id"],
            referencedTableName: "bands",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("band_multitrack");
  }
}
