import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateTracksTable1702467751643 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "tracks",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "multitrack_id",
            type: "int",
          },
          {
            name: "user_id",
            type: "int",
          },
          {
            name: "track_name",
            type: "varchar",
            length: "127",
          },
          {
            name: "img_url",
            type: "varchar",
            length: "255",
            default: '"./public/img_def_user/def-track-img.jpeg"',
          },
          {
            name: "track_url",
            type: "varchar",
            length: "511",
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
            columnNames: ["multitrack_id"],
            referencedTableName: "band_multitrack",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
          {
            columnNames: ["user_id"],
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            onDelete: "CASCADE",
          },
        ],
        indices: [
          {
            columnNames: ["multitrack_id", "track_url"],
            isUnique: true,
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("tracks");
  }
}
