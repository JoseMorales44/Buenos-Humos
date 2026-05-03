import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FlatProduct } from '../lib/wpCatalog'

export interface CartState {
  items: FlatProduct[]
  isOpen: boolean
  add: (product: FlatProduct) => void
  remove: (slug: string) => void
  toggle: (product: FlatProduct) => void
  clear: () => void
  has: (slug: string) => boolean
  open: () => void
  close: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      add: (product) =>
        set((state) =>
          state.items.some((i) => i.slug === product.slug)
            ? state
            : { items: [...state.items, product] },
        ),
      remove: (slug) =>
        set((state) => ({ items: state.items.filter((i) => i.slug !== slug) })),
      toggle: (product) => {
        const { has, remove, add } = get()
        if (has(product.slug)) remove(product.slug)
        else add(product)
      },
      clear: () => set({ items: [] }),
      has: (slug) => get().items.some((i) => i.slug === slug),
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    {
      name: 'bh-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
