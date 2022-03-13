/*
  Warnings:

  - You are about to drop the `NFT` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "AchievementEnum" AS ENUM ('GOOD_SAMARIAN', 'TETA_HELPER');

-- AlterEnum
ALTER TYPE "UserType" ADD VALUE 'ADMIN';

-- DropTable
DROP TABLE "NFT";

-- CreateTable
CREATE TABLE "Achievement" (
    "id" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "contractName" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Achievement_pkey" PRIMARY KEY ("id")
);
