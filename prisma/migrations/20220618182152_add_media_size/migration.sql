/*
  Warnings:

  - You are about to drop the column `media` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `media` on the `Tweet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "media",
ADD COLUMN     "mediaHeight" INTEGER,
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "mediaWidth" INTEGER;

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "media",
ADD COLUMN     "mediaHeight" INTEGER,
ADD COLUMN     "mediaUrl" TEXT,
ADD COLUMN     "mediaWidth" INTEGER;
