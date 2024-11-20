-- AlterTable
CREATE SEQUENCE console_id_seq;
ALTER TABLE "Console" ALTER COLUMN "id" SET DEFAULT nextval('console_id_seq');
ALTER SEQUENCE console_id_seq OWNED BY "Console"."id";

-- AlterTable
CREATE SEQUENCE game_id_seq;
ALTER TABLE "Game" ALTER COLUMN "id" SET DEFAULT nextval('game_id_seq');
ALTER SEQUENCE game_id_seq OWNED BY "Game"."id";

-- AlterTable
CREATE SEQUENCE gameageratings_id_seq;
ALTER TABLE "GameAgeRatings" ALTER COLUMN "id" SET DEFAULT nextval('gameageratings_id_seq');
ALTER SEQUENCE gameageratings_id_seq OWNED BY "GameAgeRatings"."id";

-- AlterTable
CREATE SEQUENCE gamealternativenames_id_seq;
ALTER TABLE "GameAlternativeNames" ALTER COLUMN "id" SET DEFAULT nextval('gamealternativenames_id_seq');
ALTER SEQUENCE gamealternativenames_id_seq OWNED BY "GameAlternativeNames"."id";

-- AlterTable
CREATE SEQUENCE gamefranchises_id_seq;
ALTER TABLE "GameFranchises" ALTER COLUMN "id" SET DEFAULT nextval('gamefranchises_id_seq');
ALTER SEQUENCE gamefranchises_id_seq OWNED BY "GameFranchises"."id";

-- AlterTable
CREATE SEQUENCE gamegenres_id_seq;
ALTER TABLE "GameGenres" ALTER COLUMN "id" SET DEFAULT nextval('gamegenres_id_seq');
ALTER SEQUENCE gamegenres_id_seq OWNED BY "GameGenres"."id";

-- AlterTable
CREATE SEQUENCE gameinfo_id_seq;
ALTER TABLE "GameInfo" ALTER COLUMN "id" SET DEFAULT nextval('gameinfo_id_seq');
ALTER SEQUENCE gameinfo_id_seq OWNED BY "GameInfo"."id";

-- AlterTable
CREATE SEQUENCE gameinvolvedcompanies_id_seq;
ALTER TABLE "GameInvolvedCompanies" ALTER COLUMN "id" SET DEFAULT nextval('gameinvolvedcompanies_id_seq');
ALTER SEQUENCE gameinvolvedcompanies_id_seq OWNED BY "GameInvolvedCompanies"."id";

-- AlterTable
CREATE SEQUENCE gamemodes_id_seq;
ALTER TABLE "GameModes" ALTER COLUMN "id" SET DEFAULT nextval('gamemodes_id_seq');
ALTER SEQUENCE gamemodes_id_seq OWNED BY "GameModes"."id";

-- AlterTable
CREATE SEQUENCE gameplatforms_id_seq;
ALTER TABLE "GamePlatforms" ALTER COLUMN "id" SET DEFAULT nextval('gameplatforms_id_seq');
ALTER SEQUENCE gameplatforms_id_seq OWNED BY "GamePlatforms"."id";

-- AlterTable
CREATE SEQUENCE gamereleasedates_id_seq;
ALTER TABLE "GameReleaseDates" ALTER COLUMN "id" SET DEFAULT nextval('gamereleasedates_id_seq');
ALTER SEQUENCE gamereleasedates_id_seq OWNED BY "GameReleaseDates"."id";

-- AlterTable
CREATE SEQUENCE gamescreenshots_id_seq;
ALTER TABLE "GameScreenShots" ALTER COLUMN "id" SET DEFAULT nextval('gamescreenshots_id_seq');
ALTER SEQUENCE gamescreenshots_id_seq OWNED BY "GameScreenShots"."id";

-- AlterTable
CREATE SEQUENCE gamethemes_id_seq;
ALTER TABLE "GameThemes" ALTER COLUMN "id" SET DEFAULT nextval('gamethemes_id_seq');
ALTER SEQUENCE gamethemes_id_seq OWNED BY "GameThemes"."id";

-- AlterTable
CREATE SEQUENCE gamevideos_id_seq;
ALTER TABLE "GameVideos" ALTER COLUMN "id" SET DEFAULT nextval('gamevideos_id_seq');
ALTER SEQUENCE gamevideos_id_seq OWNED BY "GameVideos"."id";

-- AlterTable
CREATE SEQUENCE gamewebsites_id_seq;
ALTER TABLE "GameWebsites" ALTER COLUMN "id" SET DEFAULT nextval('gamewebsites_id_seq');
ALTER SEQUENCE gamewebsites_id_seq OWNED BY "GameWebsites"."id";
