/*
  Warnings:

  - You are about to drop the column `version` on the `GamePlatforms` table. All the data in the column will be lost.
  - You are about to drop the `_GameInfoToGamePlatforms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_GameInfoToGamePlatforms" DROP CONSTRAINT "_GameInfoToGamePlatforms_A_fkey";

-- DropForeignKey
ALTER TABLE "_GameInfoToGamePlatforms" DROP CONSTRAINT "_GameInfoToGamePlatforms_B_fkey";

-- AlterTable
ALTER TABLE "GamePlatforms" DROP COLUMN "version",
ADD COLUMN     "gameInfoId" INTEGER,
ADD COLUMN     "versions" INTEGER[];

-- DropTable
DROP TABLE "_GameInfoToGamePlatforms";

-- AddForeignKey
ALTER TABLE "GamePlatforms" ADD CONSTRAINT "GamePlatforms_gameInfoId_fkey" FOREIGN KEY ("gameInfoId") REFERENCES "GameInfo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
