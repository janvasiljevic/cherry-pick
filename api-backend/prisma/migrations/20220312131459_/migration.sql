/*
  Warnings:

  - The primary key for the `Assistant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `locationKnown` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `telephoneNumber` on the `Assistant` table. All the data in the column will be lost.
  - You are about to drop the column `yearOfBirth` on the `Assistant` table. All the data in the column will be lost.
  - The primary key for the `Bid` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `assistantId` on the `Bid` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Bid` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `createdUserId` to the `Bid` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('USER', 'ASSISTANT');

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_assistantId_fkey";

-- DropForeignKey
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_userId_fkey";

-- DropIndex
DROP INDEX "Assistant_email_key";

-- AlterTable
ALTER TABLE "Assistant" DROP CONSTRAINT "Assistant_pkey",
DROP COLUMN "email",
DROP COLUMN "latitude",
DROP COLUMN "locationKnown",
DROP COLUMN "longitude",
DROP COLUMN "password",
DROP COLUMN "telephoneNumber",
DROP COLUMN "yearOfBirth",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Assistant_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Assistant_id_seq";

-- AlterTable
ALTER TABLE "Bid" DROP CONSTRAINT "Bid_pkey",
DROP COLUMN "assistantId",
DROP COLUMN "userId",
ADD COLUMN     "assistedUserId" TEXT,
ADD COLUMN     "createdUserId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Bid_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Bid_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ADD COLUMN     "userType" "UserType" NOT NULL DEFAULT E'USER',
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_createdUserId_fkey" FOREIGN KEY ("createdUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Bid" ADD CONSTRAINT "Bid_assistedUserId_fkey" FOREIGN KEY ("assistedUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
