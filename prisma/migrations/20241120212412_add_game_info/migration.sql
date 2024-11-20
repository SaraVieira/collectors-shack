/*
  Warnings:

  - You are about to drop the column `info` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `purchaseDate` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `purchasePrice` on the `Game` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" DROP COLUMN "info",
DROP COLUMN "purchaseDate",
DROP COLUMN "purchasePrice",
ADD COLUMN     "gameInfoId" INTEGER,
ADD COLUMN     "purchase_date" TIMESTAMP(3),
ADD COLUMN     "purchase_price" DOUBLE PRECISION,
ALTER COLUMN "igdb_id" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "GameAgeRatings" (
    "id" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "GameAgeRatings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameAlternativeNames" (
    "id" INTEGER NOT NULL,
    "game" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "GameAlternativeNames_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameFranchises" (
    "id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "games" TEXT[],
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameFranchises_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameModes" (
    "id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameModes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameGenres" (
    "id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameGenres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInvolvedCompanies" (
    "id" INTEGER NOT NULL,
    "company" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "developer" BOOLEAN NOT NULL,
    "game" INTEGER NOT NULL,
    "porting" BOOLEAN NOT NULL,
    "publisher" BOOLEAN NOT NULL,
    "supporting" BOOLEAN NOT NULL,
    "updated_at" INTEGER NOT NULL,

    CONSTRAINT "GameInvolvedCompanies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GamePlatforms" (
    "id" INTEGER NOT NULL,
    "abbreviation" TEXT NOT NULL,
    "alternative_name" TEXT NOT NULL,
    "category" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "generation" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "platform_logo" INTEGER NOT NULL,
    "platform_family" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "version" INTEGER[],

    CONSTRAINT "GamePlatforms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameReleaseDates" (
    "id" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "date" INTEGER NOT NULL,
    "game" INTEGER NOT NULL,
    "human" TEXT NOT NULL,
    "m" INTEGER NOT NULL,
    "platform" INTEGER NOT NULL,
    "region" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "y" INTEGER NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "GameReleaseDates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameScreenShots" (
    "id" INTEGER NOT NULL,
    "image_id" TEXT NOT NULL,
    "game" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "width" INTEGER NOT NULL,

    CONSTRAINT "GameScreenShots_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameThemes" (
    "id" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameThemes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameVideos" (
    "id" INTEGER NOT NULL,
    "game" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,

    CONSTRAINT "GameVideos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameWebsites" (
    "id" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "game" INTEGER NOT NULL,
    "trusted" BOOLEAN NOT NULL,
    "url" TEXT NOT NULL,

    CONSTRAINT "GameWebsites_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameInfo" (
    "id" INTEGER NOT NULL,
    "category" INTEGER NOT NULL,
    "cover" INTEGER NOT NULL,
    "created_at" INTEGER NOT NULL,
    "first_release_date" INTEGER NOT NULL,
    "aggregated_rating" INTEGER NOT NULL,
    "aggregated_rating_count" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    "rating_count" INTEGER NOT NULL,
    "slug" TEXT NOT NULL,
    "storyline" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "total_rating" INTEGER NOT NULL,
    "total_rating_count" INTEGER NOT NULL,
    "updated_at" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "gameAgeRatingsId" INTEGER NOT NULL,
    "gameAlternativeNamesId" INTEGER NOT NULL,
    "gameFranchisesId" INTEGER NOT NULL,
    "gameModesId" INTEGER NOT NULL,
    "gameGenresId" INTEGER NOT NULL,
    "gameInvolvedCompaniesId" INTEGER NOT NULL,
    "gamePlatformsId" INTEGER NOT NULL,
    "ports" INTEGER[],
    "gameReleaseDatesId" INTEGER NOT NULL,
    "gameScreenShotsId" INTEGER NOT NULL,
    "gameThemesId" INTEGER NOT NULL,
    "gameVideosId" INTEGER NOT NULL,
    "gameWebsitesId" INTEGER NOT NULL,

    CONSTRAINT "GameInfo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameWebsitesId_fkey" FOREIGN KEY ("gameWebsitesId") REFERENCES "GameWebsites"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameVideosId_fkey" FOREIGN KEY ("gameVideosId") REFERENCES "GameVideos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameThemesId_fkey" FOREIGN KEY ("gameThemesId") REFERENCES "GameThemes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameScreenShotsId_fkey" FOREIGN KEY ("gameScreenShotsId") REFERENCES "GameScreenShots"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameModesId_fkey" FOREIGN KEY ("gameModesId") REFERENCES "GameModes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameAgeRatingsId_fkey" FOREIGN KEY ("gameAgeRatingsId") REFERENCES "GameAgeRatings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameAlternativeNamesId_fkey" FOREIGN KEY ("gameAlternativeNamesId") REFERENCES "GameAlternativeNames"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameFranchisesId_fkey" FOREIGN KEY ("gameFranchisesId") REFERENCES "GameFranchises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameGenresId_fkey" FOREIGN KEY ("gameGenresId") REFERENCES "GameGenres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameInvolvedCompaniesId_fkey" FOREIGN KEY ("gameInvolvedCompaniesId") REFERENCES "GameInvolvedCompanies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gamePlatformsId_fkey" FOREIGN KEY ("gamePlatformsId") REFERENCES "GamePlatforms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInfo" ADD CONSTRAINT "GameInfo_gameReleaseDatesId_fkey" FOREIGN KEY ("gameReleaseDatesId") REFERENCES "GameReleaseDates"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
