/*
  Warnings:

  - Added the required column `condition` to the `Purchases` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Purchases` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ItemType" AS ENUM ('GAME', 'CONSOLE', 'ACCESSORY');

-- AlterTable
ALTER TABLE "Purchases" ADD COLUMN     "condition" "Conditions" NOT NULL,
ADD COLUMN     "price_charting_url" TEXT,
ADD COLUMN     "type" "ItemType" NOT NULL,
ALTER COLUMN "shipping" DROP NOT NULL;
