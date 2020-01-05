export const SEARCH_TEXT = "SEARCH_TEXT"
export const STORE_RESULTS = "STORE_RESULTS"

export function searchText(payload) {
  return {
    type: SEARCH_TEXT,
    payload
  };
}

export function storeResults(payload) {
  return {
    type: STORE_RESULTS,
    payload
  }
}
