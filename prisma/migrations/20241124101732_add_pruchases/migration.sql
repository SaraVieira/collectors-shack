-- CreateTable
CREATE TABLE "Purchases" (
    "id" TEXT NOT NULL,
    "link" TEXT,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "shipping" INTEGER NOT NULL,
    "units" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Purchases_pkey" PRIMARY KEY ("id")
);
