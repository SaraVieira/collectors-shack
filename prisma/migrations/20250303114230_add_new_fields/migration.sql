-- AlterTable
ALTER TABLE "GameAgeRatings" ADD COLUMN     "organization" INTEGER,
ADD COLUMN     "rating_category" INTEGER;

-- AlterTable
ALTER TABLE "GamePlatforms" ADD COLUMN     "platform_type" INTEGER;

-- AlterTable
ALTER TABLE "GameReleaseDates" ADD COLUMN     "date_format" INTEGER,
ADD COLUMN     "release_region" INTEGER;

-- AlterTable
ALTER TABLE "GameWebsites" ADD COLUMN     "type" INTEGER;
