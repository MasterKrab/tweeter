import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import { useRef, useId } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import TweetItem from 'components/TweetItem'
import MessageEmpty from 'components/MessageEmpty'
import Spinner from 'components/Spinner'

interface TweetsProps {
  tweets: Tweet[]
  onLoadMoreTweets?: () => void
  isLoading?: boolean
  ariaLabel?: string
  ariaLabelledBy?: string
  payloadId: tweetId
}

const Tweets = ({
  tweets,
  onLoadMoreTweets,
  isLoading,
  ariaLabel,
  ariaLabelledBy,
  payloadId,
}: TweetsProps) => {
  const tweetsRef = useRef<HTMLElement>(null)
  const dump = useInfiniteScroll(() => {
    onLoadMoreTweets && tweets.length && onLoadMoreTweets()
  }, !isLoading)

  const id = useId()

  return (
    <>
      <article
        ref={tweetsRef}
        className="tweets"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {tweets.length ? (
          <>
            {tweets.map((tweet) => (
              <TweetItem
                key={`${id}-${tweet.id}`}
                payloadId={payloadId}
                {...tweet}
              />
            ))}
            <div ref={dump} />
          </>
        ) : (
          <MessageEmpty />
        )}
      </article>
      {isLoading && (
        <Spinner
          size="5rem"
          borderWidth="0.75rem"
          primaryColor="var(--gray-2)"
          secondaryColor="var(--blue)"
          marginLeft="auto"
          marginRight="auto"
        />
      )}
      <style jsx>{`
        .tweets {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.659rem;
        }
      `}</style>
    </>
  )
}

export default Tweets
