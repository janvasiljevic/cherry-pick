-- CreateTable
CREATE TABLE "NFT" (
    "id" TEXT NOT NULL,
    "contractAddress" TEXT NOT NULL,
    "contractName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NFT_pkey" PRIMARY KEY ("id")
);
