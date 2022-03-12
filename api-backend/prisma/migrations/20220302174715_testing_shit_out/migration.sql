/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `keycloakId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_keycloakId_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "keycloakId";
