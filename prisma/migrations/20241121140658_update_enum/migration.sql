/*
  Warnings:

  - The values [BOXED,WITH_BOX] on the enum `Conditions` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Conditions_new" AS ENUM ('NEW', 'COMPLETE', 'LOOSE', 'BAD', 'NOT_WORKING');
ALTER TABLE "Console" ALTER COLUMN "condition" TYPE "Conditions_new" USING ("condition"::text::"Conditions_new");
ALTER TABLE "Game" ALTER COLUMN "condition" TYPE "Conditions_new" USING ("condition"::text::"Conditions_new");
ALTER TYPE "Conditions" RENAME TO "Conditions_old";
ALTER TYPE "Conditions_new" RENAME TO "Conditions";
DROP TYPE "Conditions_old";
COMMIT;
