export const PAGINATION_CONFIG = {
  // Number of games per page
  PAGE_SIZE: 48,

  // Maximum number of page buttons to show in pagination
  MAX_VISIBLE_PAGES: 7,

  // Number of games to show in search dropdown
  SEARCH_RESULTS_LIMIT: 8,

  // Virtual scrolling threshold - use virtual scrolling for lists larger than this
  VIRTUAL_SCROLL_THRESHOLD: 200,

  // Category virtual scroll threshold
  CATEGORY_VIRTUAL_SCROLL_THRESHOLD: 100,
} as const;