/*
  Warnings:

  - You are about to drop the column `comments` on the `GameInfo` table. All the data in the column will be lost.
  - You are about to drop the column `photos` on the `GameInfo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Game" ADD COLUMN     "comments" TEXT,
ADD COLUMN     "photos" TEXT[];

-- AlterTable
ALTER TABLE "GameInfo" DROP COLUMN "comments",
DROP COLUMN "photos";
