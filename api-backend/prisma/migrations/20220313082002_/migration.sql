/*
  Warnings:

  - You are about to drop the `_AchievementToAssistant` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AchievementToAssistant" DROP CONSTRAINT "_AchievementToAssistant_A_fkey";

-- DropForeignKey
ALTER TABLE "_AchievementToAssistant" DROP CONSTRAINT "_AchievementToAssistant_B_fkey";

-- AlterTable
ALTER TABLE "Assistant" ADD COLUMN     "achievement" TEXT[];

-- DropTable
DROP TABLE "_AchievementToAssistant";
