-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'WORKER', 'ADMIN');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('OCCUPIED', 'UNOCCUPIED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT E'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Item" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "placeId" INTEGER,
    "name" VARCHAR(50) NOT NULL,
    "description" VARCHAR(255),

    CONSTRAINT "Item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER,
    "occupation" "Occupation" NOT NULL DEFAULT E'UNOCCUPIED',

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Item" ADD CONSTRAINT "Item_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Place" ADD CONSTRAINT "Place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
