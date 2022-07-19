-- CreateIndex
CREATE INDEX "Bookmark_userId_tweetId_idx" ON "Bookmark" USING HASH ("userId", "tweetId");

-- CreateIndex
CREATE INDEX "Comment_userId_tweetId_idx" ON "Comment" USING HASH ("userId", "tweetId");

-- CreateIndex
CREATE INDEX "CommentLike_userId_commentId_idx" ON "CommentLike"("userId", "commentId");

-- CreateIndex
CREATE INDEX "Like_userId_tweetId_idx" ON "Like" USING HASH ("userId", "tweetId");

-- CreateIndex
CREATE INDEX "ReTweet_userId_tweetId_idx" ON "ReTweet" USING HASH ("userId", "tweetId");
