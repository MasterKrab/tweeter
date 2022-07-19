/*
  Warnings:

  - The `replyPermission` column on the `Tweet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Bookmark` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,commentId]` on the table `CommentLike` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[followerId,followedId]` on the table `Follower` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `Like` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,tweetId]` on the table `ReTweet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateEnum
CREATE TYPE "ReplyPermission" AS ENUM ('everyone', 'following');

-- AlterTable
ALTER TABLE "Tweet" DROP COLUMN "replyPermission",
ADD COLUMN     "replyPermission" "ReplyPermission" NOT NULL DEFAULT E'everyone';

-- CreateIndex
CREATE UNIQUE INDEX "Bookmark_userId_tweetId_key" ON "Bookmark"("userId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "CommentLike_userId_commentId_key" ON "CommentLike"("userId", "commentId");

-- CreateIndex
CREATE UNIQUE INDEX "Follower_followerId_followedId_key" ON "Follower"("followerId", "followedId");

-- CreateIndex
CREATE UNIQUE INDEX "Like_userId_tweetId_key" ON "Like"("userId", "tweetId");

-- CreateIndex
CREATE UNIQUE INDEX "ReTweet_userId_tweetId_key" ON "ReTweet"("userId", "tweetId");
