import type Tweet from 'types/tweet'
import type { tweetId } from 'reducers/tweetsSlice'
import { useRef, useId } from 'react'
import useInfiniteScroll from 'hooks/useInfiniteScroll'
import useIsMounted from 'hooks/useIsMounted'
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
  const isMounted = useIsMounted()
  const id = useId()

  return (
    <>
      <div>
        {isMounted && (
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
                !isLoading && <MessageEmpty />
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
          </>
        )}
      </div>
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
