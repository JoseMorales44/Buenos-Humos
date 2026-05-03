import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface ChatMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: number
}

export interface ChatState {
  messages: ChatMessage[]
  isOpen: boolean
  isLoading: boolean
  addMessage: (msg: Omit<ChatMessage, 'id' | 'timestamp'>) => void
  clearMessages: () => void
  open: () => void
  close: () => void
  toggle: () => void
  setLoading: (loading: boolean) => void
}

const MAX_MESSAGES = 40

export const useChatStore = create<ChatState>()(
  persist(
    (set, get) => ({
      messages: [],
      isOpen: false,
      isLoading: false,

      addMessage: (msg) =>
        set((state) => ({
          messages: [
            ...state.messages.slice(-MAX_MESSAGES + 1),
            { ...msg, id: crypto.randomUUID(), timestamp: Date.now() },
          ],
        })),

      clearMessages: () => set({ messages: [] }),

      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
      toggle: () => set((state) => ({ isOpen: !state.isOpen })),

      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'bh-chat',
      partialize: (state) => ({ messages: state.messages.slice(-10) }),
    },
  ),
)
