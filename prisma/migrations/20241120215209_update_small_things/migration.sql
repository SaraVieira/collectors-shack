/*
  Warnings:

  - The `games` column on the `GameFranchises` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `gameAgeRatingsId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameAlternativeNamesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameFranchisesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameGenresId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameInvolvedCompaniesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameModesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gamePlatformsId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameReleaseDatesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameScreenShotsId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameThemesId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameVideosId` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `gameWebsitesId` on the `GameInfo` table. All the data in the column will be lost.
  - Added the required column `name` to the `GameInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameAgeRatingsId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameAlternativeNamesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameFranchisesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameGenresId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameInvolvedCompaniesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameModesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gamePlatformsId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameReleaseDatesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameScreenShotsId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameThemesId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameVideosId_fkey";

-- DropForeignKey
ALTER TABLE "GameInfo" DROP CONSTRAINT "GameInfo_gameWebsitesId_fkey";

-- AlterTable
ALTER TABLE "GameAgeRatings" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameAlternativeNames" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameFranchises" ADD COLUMN     "gameInfoId" INTEGER,
DROP COLUMN "games",
ADD COLUMN     "games" INTEGER[];

-- AlterTable
ALTER TABLE "GameGenres" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "gameAgeRatingsId",
DROP COLUMN "gameAlternativeNamesId",
DROP COLUMN "gameFranchisesId",
DROP COLUMN "gameGenresId",
DROP COLUMN "gameInvolvedCompaniesId",
DROP COLUMN "gameModesId",
DROP COLUMN "gamePlatformsId",
DROP COLUMN "gameReleaseDatesId",
DROP COLUMN "gameScreenShotsId",
DROP COLUMN "gameThemesId",
DROP COLUMN "gameVideosId",
DROP COLUMN "gameWebsitesId",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "GameInvolvedCompanies" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameModes" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameReleaseDates" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameScreenShots" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameThemes" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameVideos" ADD COLUMN     "gameInfoId" INTEGER;

-- AlterTable
ALTER TABLE "GameWebsites" ADD COLUMN     "gameInfoId" INTEGER;

-- CreateTable
CREATE TABLE "_GameInfoToGamePlatforms" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_GameInfoToGamePlatforms_AB_unique" ON "_GameInfoToGamePlatforms"("A", "B");

-- CreateIndex
CREATE INDEX "_GameInfoToGamePlatforms_B_index" ON "_GameInfoToGamePlatforms"("B");

-- AddForeignKey
ALTER TABLE "GameAgeRatings" ADD CONSTRAINT "GameAgeRatings_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameAlternativeNames" ADD CONSTRAINT "GameAlternativeNames_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameFranchises" ADD CONSTRAINT "GameFranchises_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameModes" ADD CONSTRAINT "GameModes_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameGenres" ADD CONSTRAINT "GameGenres_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameInvolvedCompanies" ADD CONSTRAINT "GameInvolvedCompanies_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameReleaseDates" ADD CONSTRAINT "GameReleaseDates_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameScreenShots" ADD CONSTRAINT "GameScreenShots_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameThemes" ADD CONSTRAINT "GameThemes_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameVideos" ADD CONSTRAINT "GameVideos_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameWebsites" ADD CONSTRAINT "GameWebsites_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameInfoToGamePlatforms" ADD CONSTRAINT "_GameInfoToGamePlatforms_A_fkey" FOREIGN KEY ("A") REFERENCES "GameInfo"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GameInfoToGamePlatforms" ADD CONSTRAINT "_GameInfoToGamePlatforms_B_fkey" FOREIGN KEY ("B") REFERENCES "GamePlatforms"("id") ON DELETE CASCADE ON UPDATE CASCADE;
