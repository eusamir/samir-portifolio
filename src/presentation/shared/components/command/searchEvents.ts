export const SEARCH_OPEN_EVENT = 'samir:search-open'
export const COPY_EMAIL_EVENT = 'samir:copy-email'

export const openSearch = () =>
  window.dispatchEvent(new Event(SEARCH_OPEN_EVENT))
