const EXPLORE_FILTERS = {
  TOP: 'top',
  LATEST: 'latest',
  PEOPLE: 'people',
  MEDIA: 'media',
}

export type ExploreFilter = typeof EXPLORE_FILTERS[keyof typeof EXPLORE_FILTERS]

export const exploreFilters: ExploreFilter[] = Object.values(EXPLORE_FILTERS)

export const EXPLORE_FILTERS_TEXTS = {
  [EXPLORE_FILTERS.TOP]: 'Top',
  [EXPLORE_FILTERS.LATEST]: 'Latest',
  [EXPLORE_FILTERS.PEOPLE]: 'People',
  [EXPLORE_FILTERS.MEDIA]: 'Media',
}

export default EXPLORE_FILTERS
