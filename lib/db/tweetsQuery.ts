const tweetsQuery = {
  include: {
    user: {
      select: {
        id: true,
        name: true,
        image: true,
      },
    },
    comments: {
      select: {
        id: true,
        content: true,
        mediaUrl: true,
        mediaWidth: true,
        mediaHeight: true,
        createdAt: true,
        tweetId: true,
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: {
            likes: true,
          },
        },
      },
    },
    _count: {
      select: {
        comments: true,
        reTweets: true,
        bookmarks: true,
      },
    },
  },
}

export default tweetsQuery
