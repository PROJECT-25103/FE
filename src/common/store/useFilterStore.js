import { debounce } from "lodash";
import { create } from "zustand";

export const useFilterStore = create((set, get) => ({
  query: {},

  setQuery: (query) => set({ query }),

  resetFilter: () => set({ query: {} }),

  resetFilterExceptPageAndLimit: () => {
    const { query } = get();
    const newQuery = {};
    if (query.page) newQuery.page = query.page;
    if (query.limit) newQuery.limit = query.limit;
    set({ query: newQuery });
  },

  updateQueryParams: (params) => {
    const newParams = {};
    for (const [key, value] of Object.entries(params)) {
      if (value !== undefined && value !== "") newParams[key] = value;
    }
    set({ query: newParams });
  },

  onChangeSearchInput: debounce((text, options) => {
    const { query, updateQueryParams } = get();
    if (options.enableOnChangeSearch) {
      updateQueryParams({ ...query, search: text });
    }
  }, 500),
}));