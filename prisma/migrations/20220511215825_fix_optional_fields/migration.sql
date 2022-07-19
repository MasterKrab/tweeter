/*
  Warnings:

  - You are about to drop the column `replyPermission` on the `Comment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "replyPermission",
ALTER COLUMN "media" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Tweet" ALTER COLUMN "media" DROP NOT NULL;
