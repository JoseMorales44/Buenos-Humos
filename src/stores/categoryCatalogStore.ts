import { create } from 'zustand'

export type CatalogSort = 'default' | 'name-asc' | 'name-desc'

export interface CategoryCatalogState {
  searchInput: string
  debouncedSearch: string
  sortBy: CatalogSort
  filterId: 'all' | string
  setSearchInput: (value: string) => void
  setDebouncedSearch: (value: string) => void
  setSortBy: (value: CatalogSort) => void
  setFilterId: (value: 'all' | string) => void
}

export const useCategoryCatalogStore = create<CategoryCatalogState>((set) => ({
  searchInput: '',
  debouncedSearch: '',
  sortBy: 'default',
  filterId: 'all',
  setSearchInput: (searchInput) => set({ searchInput }),
  setDebouncedSearch: (debouncedSearch) => set({ debouncedSearch }),
  setSortBy: (sortBy) => set({ sortBy }),
  setFilterId: (filterId) => set({ filterId }),
}))
