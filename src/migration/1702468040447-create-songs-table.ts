import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateSongsTable1702468040447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "songs",
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
            name: "song_name",
            type: "varchar",
            length: "127",
            isUnique: true,
          },
          {
            name: "img_url",
            type: "varchar",
            length: "255",
            default: '"./public/img_def_user/def-song-img.jpeg"',
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
    await queryRunner.dropTable("songs");
  }
}
