-- AlterTable
ALTER TABLE "Tweet" ADD COLUMN     "replyPermission" TEXT NOT NULL DEFAULT E'everyone';
