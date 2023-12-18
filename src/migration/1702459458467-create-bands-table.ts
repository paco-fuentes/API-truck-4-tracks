import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateBandsTable1702459458467 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "bands",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "band_leader",
            type: "int",
          },
          {
            name: "band_name",
            type: "varchar",
            length: "127",
            isUnique: true,
          },
          {
            name: "about",
            type: "varchar",
            length: "511",
            isNullable: true,
          },
          {
            name: "img_url",
            type: "varchar",
            length: "255",
            default: '"/img_def_user/def-band-img.jpeg"',
          },
          {
            name: "hiring",
            type: "enum",
            enum: ["hiring", "complete"],
            default: '"hiring"',
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
            columnNames: ["band_leader"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("bands");
  }
}
