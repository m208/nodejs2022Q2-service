import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialCreating1676644263481 implements MigrationInterface {
  name = 'InitialCreating1676644263481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "artist" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "grammy" boolean NOT NULL,
                CONSTRAINT "PK_55b76e71568b5db4d01d3e394ed" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "album" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "year" integer NOT NULL,
                "artistId" uuid,
                CONSTRAINT "PK_58e0b4b8a31bb897e6959fe3206" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "track" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "name" character varying NOT NULL,
                "artistId" uuid,
                "albumId" uuid,
                "duration" integer NOT NULL,
                CONSTRAINT "PK_0631b9bcf521f8fab3a15f2c37e" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "favorite_tracks" (
                "id" character varying NOT NULL,
                "relatedId" uuid,
                CONSTRAINT "REL_0233622fa80dab14d501b4a08a" UNIQUE ("relatedId"),
                CONSTRAINT "PK_8d34ad5c55c7d5448fad8c4ced7" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "favorite_artists" (
                "id" character varying NOT NULL,
                "relatedId" uuid,
                CONSTRAINT "REL_fa55c3e9dbb230c991f6218010" UNIQUE ("relatedId"),
                CONSTRAINT "PK_a2808c56d3dc5d8882f9495e63d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "favorite_albums" (
                "id" character varying NOT NULL,
                "relatedId" uuid,
                CONSTRAINT "REL_0c1c71b065698811ef6ca6df09" UNIQUE ("relatedId"),
                CONSTRAINT "PK_8435921763b8a56c98b3700773d" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            CREATE TABLE "user" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL,
                "password" character varying NOT NULL,
                "version" integer NOT NULL DEFAULT '0',
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id")
            )
        `);
    await queryRunner.query(`
            ALTER TABLE "album"
            ADD CONSTRAINT "FK_3d06f25148a4a880b429e3bc839" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "track"
            ADD CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2" FOREIGN KEY ("artistId") REFERENCES "artist"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "track"
            ADD CONSTRAINT "FK_b105d945c4c185395daca91606a" FOREIGN KEY ("albumId") REFERENCES "album"("id") ON DELETE
            SET NULL ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_tracks"
            ADD CONSTRAINT "FK_0233622fa80dab14d501b4a08ad" FOREIGN KEY ("relatedId") REFERENCES "track"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_artists"
            ADD CONSTRAINT "FK_fa55c3e9dbb230c991f62180100" FOREIGN KEY ("relatedId") REFERENCES "artist"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_albums"
            ADD CONSTRAINT "FK_0c1c71b065698811ef6ca6df09e" FOREIGN KEY ("relatedId") REFERENCES "album"("id") ON DELETE CASCADE ON UPDATE NO ACTION
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            ALTER TABLE "favorite_albums" DROP CONSTRAINT "FK_0c1c71b065698811ef6ca6df09e"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_artists" DROP CONSTRAINT "FK_fa55c3e9dbb230c991f62180100"
        `);
    await queryRunner.query(`
            ALTER TABLE "favorite_tracks" DROP CONSTRAINT "FK_0233622fa80dab14d501b4a08ad"
        `);
    await queryRunner.query(`
            ALTER TABLE "track" DROP CONSTRAINT "FK_b105d945c4c185395daca91606a"
        `);
    await queryRunner.query(`
            ALTER TABLE "track" DROP CONSTRAINT "FK_997cfd9e91fd00a363500f72dc2"
        `);
    await queryRunner.query(`
            ALTER TABLE "album" DROP CONSTRAINT "FK_3d06f25148a4a880b429e3bc839"
        `);
    await queryRunner.query(`
            DROP TABLE "user"
        `);
    await queryRunner.query(`
            DROP TABLE "favorite_albums"
        `);
    await queryRunner.query(`
            DROP TABLE "favorite_artists"
        `);
    await queryRunner.query(`
            DROP TABLE "favorite_tracks"
        `);
    await queryRunner.query(`
            DROP TABLE "track"
        `);
    await queryRunner.query(`
            DROP TABLE "album"
        `);
    await queryRunner.query(`
            DROP TABLE "artist"
        `);
  }
}
