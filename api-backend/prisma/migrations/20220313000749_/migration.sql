/*
  Warnings:

  - Added the required column `backendName` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BackendEnum" AS ENUM ('GOOD_SAMARIAN', 'TETA_HELPER');

-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "backendName" "BackendEnum" NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "image" BYTEA NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Badge" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "assistantId" TEXT NOT NULL,
    "nFTId" TEXT NOT NULL,

    CONSTRAINT "Badge_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Badge" ADD CONSTRAINT "Badge_nFTId_fkey" FOREIGN KEY ("nFTId") REFERENCES "NFT"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
