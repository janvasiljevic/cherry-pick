-- AlterTable
ALTER TABLE "User" ADD COLUMN     "assistantId" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_assistantId_fkey" FOREIGN KEY ("assistantId") REFERENCES "Assistant"("id") ON DELETE SET NULL ON UPDATE CASCADE;
