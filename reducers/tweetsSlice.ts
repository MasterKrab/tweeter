import type Tweet from 'types/tweet'
import type { RootState } from 'app/store'
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  AnyAction,
  SerializedError,
} from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { diff } from 'jsondiffpatch'
import getTweets from 'lib/clientApi/getTweets'
import getProfileTweets from 'lib/clientApi/getProfileTweets'
import getExploreTweets from 'lib/clientApi/getExploreTweets'
import getBookmarksTweets from 'lib/clientApi/getBookmarksTweets'
import createTweet from 'lib/clientApi/createTweet'
import { createTweetAction, deleteTweetAction } from 'lib/clientApi/tweetAction'
import { createCommentLike, deleteCommentLike } from 'lib/clientApi/commentLike'
import createMapTweetActions from 'utils/createMapTweetActions'
import createMapTweetsCommentLike from 'utils/createMapTweetsCommentLike'
import createComment from 'lib/clientApi/createComment'

export const fetchTweets = createAsyncThunk('tweets/fetchTweets', getTweets)

export const fetchProfileTweets = createAsyncThunk(
  'tweets/fetchProfileTweets',
  getProfileTweets
)

export const fetchExploreTweets = createAsyncThunk(
  'tweets/fetchExploreTweets',
  getExploreTweets
)

export const fetchBookmarksTweets = createAsyncThunk(
  'tweets/fetchBookmarksTweets',
  getBookmarksTweets
)

export const fetchCreateTweet = createAsyncThunk(
  'tweets/fetchCreateTweet',
  createTweet
)

export const fetchCreateTweetAction = createAsyncThunk(
  'tweets/fetchCreateTweetAction',
  createTweetAction
)

export const fetchDeleteTweetAction = createAsyncThunk(
  'tweets/fetchDeleteTweetAction',
  deleteTweetAction
)

export const fetchCreateCommentLike = createAsyncThunk(
  'tweets/fetchCreateCommentLike',
  createCommentLike
)

export const fetchDeleteCommentLike = createAsyncThunk(
  'tweets/fetchDeleteCommentLike',
  deleteCommentLike
)

export const fetchCreateComment = createAsyncThunk(
  'tweets/fetchCreateComment',
  createComment
)

interface TweetsState {
  data: Tweet[]
  loading: boolean
  error: string | null
}

interface TweetsSliceState {
  home: TweetsState
  profile: TweetsState
  explore: TweetsState
  bookmarks: TweetsState
}

const createInitialStateTweets = (): TweetsState => ({
  data: [],
  loading: false,
  error: null,
})

const createInitialState = () => ({
  home: createInitialStateTweets(),
  profile: createInitialStateTweets(),
  explore: createInitialStateTweets(),
  bookmarks: createInitialStateTweets(),
})

const initialState = createInitialState()

export type tweetId = keyof typeof initialState

export const TWEETS_IDS: {
  HOME: 'home'
  PROFILE: 'profile'
  EXPLORE: 'explore'
  BOOKMARKS: 'bookmarks'
} = {
  HOME: 'home',
  PROFILE: 'profile',
  EXPLORE: 'explore',
  BOOKMARKS: 'bookmarks',
}

type PayloadTweets = PayloadAction<{ tweets: Tweet[]; id: tweetId }>

const {
  reducer,
  actions: { resetTweets, setTweets, addTweets },
} = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    setTweets: (state, { payload: { id, tweets } }: PayloadTweets) => {
      return {
        ...state,
        [id]: {
          ...state[id],
          data: tweets,
        },
      }
    },
    addTweets: (state, { payload: { id, tweets } }: PayloadTweets) => {
      const { data, ...targetState } = state[id]

      return {
        ...state,
        [id]: {
          ...targetState,
          data: [...data, ...tweets],
        },
      }
    },
    resetTweets: (
      state,
      { payload: { id } }: PayloadAction<{ id?: tweetId }>
    ) => {
      if (!id) return createInitialState()

      return {
        ...state,
        [id]: createInitialStateTweets(),
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, { payload: { tweets } }: AnyAction) => {
      const normalizedTweets = tweets as TweetsSliceState

      const difference = diff(state, tweets)

      if (!difference) return state

      const newState = { ...state }

      for (const key in normalizedTweets) {
        const currentState = tweets[key] as TweetsState

        if (!currentState.data.length) continue

        newState[key as tweetId] = currentState
      }

      return newState
    })

    const fetchTweetsCallbackFullfilled = (
      state: TweetsSliceState,
      {
        payload: { id, reset, tweets: newTweets },
      }: PayloadAction<{
        id: tweetId
        reset?: boolean
        tweets: Tweet[]
      }>
    ) => {
      const { data, ...targetState } = state[id]

      return {
        ...state,
        [id]: {
          ...targetState,
          data: reset ? newTweets : [...data, ...newTweets],
          loading: false,
        },
      }
    }

    const fetchTweetsCallbackPending = (
      state: TweetsSliceState,
      action: PayloadAction<
        undefined,
        string,
        {
          arg: {
            take?: number | undefined
            skip?: number | undefined
            media?: boolean | undefined
            reset?: boolean | undefined
            id: tweetId
          }
          requestId: string
          requestStatus: 'pending'
        }
      >
    ) => {
      const { id } = action.meta.arg

      return {
        ...state,
        [id]: {
          ...state[id],
          loading: true,
        },
      }
    }

    const fethTweetsCallbackRejected = (
      state: TweetsSliceState,
      action: PayloadAction<
        unknown,
        string,
        {
          arg: {
            take?: number | undefined
            skip?: number | undefined
            media?: boolean | undefined
            reset?: boolean | undefined
            id: 'home' | 'profile' | 'explore' | 'bookmarks'
          }
          requestId: string
          requestStatus: 'rejected'
          aborted: boolean
          condition: boolean
        },
        SerializedError
      >
    ) => {
      const { id } = action.meta.arg

      return {
        ...state,
        [id]: {
          ...state[id],
          loading: false,
          error: action.error.message || 'Something went wrong',
        },
      }
    }

    builder.addCase(fetchTweets.pending, fetchTweetsCallbackPending)
    builder.addCase(fetchTweets.fulfilled, fetchTweetsCallbackFullfilled)
    builder.addCase(fetchTweets.rejected, fethTweetsCallbackRejected)

    builder.addCase(fetchProfileTweets.pending, fetchTweetsCallbackPending)
    builder.addCase(fetchProfileTweets.fulfilled, fetchTweetsCallbackFullfilled)
    builder.addCase(fetchProfileTweets.rejected, fethTweetsCallbackRejected)

    builder.addCase(fetchExploreTweets.pending, fetchTweetsCallbackPending)
    builder.addCase(fetchExploreTweets.fulfilled, fetchTweetsCallbackFullfilled)
    builder.addCase(fetchExploreTweets.rejected, fethTweetsCallbackRejected)

    builder.addCase(fetchBookmarksTweets.pending, fetchTweetsCallbackPending)
    builder.addCase(
      fetchBookmarksTweets.fulfilled,
      fetchTweetsCallbackFullfilled
    )
    builder.addCase(fetchBookmarksTweets.rejected, fethTweetsCallbackRejected)

    builder.addCase(
      fetchCreateTweet.fulfilled,
      (state, { payload: { id, tweet } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: [tweet, ...data],
          },
        }
      }
    )

    builder.addCase(
      fetchCreateTweetAction.fulfilled,
      (state, { payload: { id, action, tweetId } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: data.map(createMapTweetActions(action, tweetId, true)),
          },
        }
      }
    )

    builder.addCase(
      fetchDeleteTweetAction.fulfilled,
      (state, { payload: { id, action, tweetId } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: data.map(createMapTweetActions(action, tweetId, false)),
          },
        }
      }
    )

    builder.addCase(
      fetchCreateCommentLike.fulfilled,
      (state, { payload: { id, tweetId, commentId } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: data.map(
              createMapTweetsCommentLike(tweetId, commentId, true)
            ),
          },
        }
      }
    )

    builder.addCase(
      fetchDeleteCommentLike.fulfilled,
      (state, { payload: { id, tweetId, commentId } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: data.map(
              createMapTweetsCommentLike(tweetId, commentId, false)
            ),
          },
        }
      }
    )

    builder.addCase(
      fetchCreateComment.fulfilled,
      (state, { payload: { id, comment } }) => {
        const { data, ...targetState } = state[id]

        return {
          ...state,
          [id]: {
            ...targetState,
            data: data.map((tweet) => {
              if (tweet.id !== comment.tweetId) return tweet

              return {
                ...tweet,
                comments: [comment, ...tweet.comments],
              }
            }),
          },
        }
      }
    )
  },
})

export { resetTweets, setTweets, addTweets }

export const createSelectTweets = (id: tweetId) => (state: RootState) =>
  state.tweets[id]

export default reducer
