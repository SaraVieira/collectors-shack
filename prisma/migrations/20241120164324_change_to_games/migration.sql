-- CreateEnum
CREATE TYPE "Consoles" AS ENUM ('p3do', 'ags', 'amiga', 'amiga1200', 'amiga600', 'amigacd32', 'amstradcpc', 'apple2', 'apple2gs', 'atari2600', 'atari5200', 'atari7800', 'atari800', 'atarijaguar', 'atarilynx', 'atarist', 'atarixe', 'bbcmicro', 'c64', 'colecovision', 'dos', 'dreamcast', 'famicom', 'fba', 'fbneo', 'fds', 'gameandwatch', 'gamecom', 'gamegear', 'gb', 'gba', 'gbc', 'gc', 'genesis', 'gx4000', 'intellivision', 'mastersystem', 'megacd', 'megacdjp', 'megadrive', 'megaduck', 'msx', 'msx1', 'msx2', 'msxturbor', 'multivision', 'n3ds', 'n64', 'n64dd', 'naomi', 'naomi2', 'naomigd', 'nds', 'neogeo', 'neogeocd', 'neogeocdjp', 'nes', 'ngage', 'ngp', 'ngpc', 'odyssey2', 'pc88', 'pc98', 'pcengine', 'pcenginecd', 'pcfx', 'pokemini', 'ps2', 'ps3', 'ps4', 'psp', 'psvita', 'psx', 'saturn', 'scv', 'sega32x', 'segacd', 'sfc', 'sg1000', 'sgb', 'snes', 'solarus', 'spectravideo', 'supergrafx', 'supervision', 'supracan', 'switch', 'tg16', 'tgcd', 'vectrex', 'virtualboy', 'wii', 'wiiu', 'windows', 'wonderswan', 'wonderswancolor', 'x1', 'x68000', 'xbox', 'xbox360', 'zmachine', 'zx81', 'zxnext', 'zxspectrum');

-- CreateEnum
CREATE TYPE "Region" AS ENUM ('PAL', 'NTSC', 'NTSCJ');

-- CreateEnum
CREATE TYPE "Conditions" AS ENUM ('BOXED', 'WITH_BOX', 'LOOSE', 'BAD', 'NOT_WORKING');

-- CreateTable
CREATE TABLE "Console" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "console" "Consoles" NOT NULL,
    "price" JSONB,
    "region" "Region" NOT NULL,
    "igdb_id" INTEGER,
    "units" INTEGER NOT NULL,
    "purchasePrice" DOUBLE PRECISION,
    "purchaseDate" TIMESTAMP(3),
    "condition" "Conditions" NOT NULL,
    "info" JSONB,

    CONSTRAINT "Console_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "console" "Consoles" NOT NULL,
    "price" JSONB,
    "region" "Region" NOT NULL,
    "igdb_id" INTEGER,
    "price_charting_url" TEXT,
    "units" INTEGER NOT NULL,
    "purchasePrice" DOUBLE PRECISION,
    "purchaseDate" TIMESTAMP(3),
    "condition" "Conditions" NOT NULL,
    "info" JSONB,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Console_name_idx" ON "Console"("name");

-- CreateIndex
CREATE INDEX "Game_name_idx" ON "Game"("name");
