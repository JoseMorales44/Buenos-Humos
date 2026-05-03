import { useState, useRef, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useApp } from '../context/AppContext'
import { useChatStore, type ChatMessage } from '../stores/chatStore'
import { MessageCircle, X, Send, Trash } from './icons'

const WHATSAPP_LINK = 'https://wa.me/573165871602'

export function ChatWidget() {
  const { lang } = useApp()
  const isOpen = useChatStore((s) => s.isOpen)
  const messages = useChatStore((s) => s.messages)
  const isLoading = useChatStore((s) => s.isLoading)
  const addMessage = useChatStore((s) => s.addMessage)
  const open = useChatStore((s) => s.open)
  const close = useChatStore((s) => s.close)
  const setLoading = useChatStore((s) => s.setLoading)
  const clearMessages = useChatStore((s) => s.clearMessages)

  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const es = lang === 'es'

  const t = {
    title: es ? 'Juancho — Asistente BH' : 'Juancho — BH Assistant',
    placeholder: es ? 'Escribí tu pregunta...' : 'Type your question...',
    sending: es ? 'Escribiendo...' : 'Typing...',
    greeting: es
      ? '¡Firme, parcero! Soy Juancho, tu asistente de Buenos Humos 🔥 Preguntame lo que necesités — productos, envíos, ubicaciones, autocultivo. ¡Aquí estamos!'
      : "What's up! I'm Juancho, your Buenos Humos assistant 🔥 Ask me about products, delivery, locations, or home cultivation!",
    error: es
      ? 'Hubo un error, parcero. Intentá de nuevo o escribinos directo al WhatsApp.'
      : 'Something went wrong, bro. Try again or reach us directly on WhatsApp.',
    clear: es ? 'Borrar chat' : 'Clear chat',
    whatsapp: es ? 'Ir a WhatsApp' : 'Go to WhatsApp',
    close: es ? 'Cerrar' : 'Close',
    send: es ? 'Enviar' : 'Send',
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close()
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  const toApiMessages = (msgs: ChatMessage[]) =>
    msgs.map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))

  const handleSend = async () => {
    const text = input.trim()
    if (!text || isLoading) return
    setInput('')
    addMessage({ role: 'user', content: text })
    setLoading(true)

    try {
      const apiMessages = [...toApiMessages(messages), { role: 'user' as const, content: text }]
      const res = await fetch('/api/cultivation-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages, lang }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      addMessage({ role: 'assistant', content: data.reply })
    } catch {
      addMessage({ role: 'assistant', content: t.error })
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const formatTime = (ts: number) =>
    new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

  return (
    <>
      {/* Toggle button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            key="chat-fab"
            type="button"
            onClick={open}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={t.title}
            className="fixed bottom-24 right-6 z-40 flex items-center justify-center rounded-full border-4 border-black bg-pink-500 p-3 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
          >
            <MessageCircle width="24" height="24" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/80 backdrop-blur-sm sm:items-center sm:p-4"
            onClick={close}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              onClick={(e) => e.stopPropagation()}
              className="flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl border-4 border-pink-500 bg-white text-black shadow-[0px_0px_0px_4px_rgba(0,0,0,1)] dark:bg-black dark:text-white dark:shadow-[0px_0px_0px_4px_rgba(255,255,255,1)] sm:rounded-2xl"
            >
              {/* Header */}
              <header className="flex items-center justify-between border-b-4 border-black bg-pink-500 px-5 py-4 text-white dark:border-white">
                <div className="flex items-center gap-3">
                  <MessageCircle width="22" height="22" />
                  <div>
                    <h3 className="text-lg font-black uppercase leading-tight">{t.title}</h3>
                    <p className="font-mono text-[11px] uppercase tracking-widest opacity-90">
                      {es ? 'Asistente virtual' : 'Virtual assistant'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={clearMessages}
                    aria-label={t.clear}
                    className="rounded-full border-2 border-black bg-white p-1.5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                    title={t.clear}
                  >
                    <Trash width="16" height="16" />
                  </button>
                  <button
                    type="button"
                    onClick={close}
                    aria-label={t.close}
                    className="rounded-full border-2 border-black bg-white p-1.5 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:border-white dark:bg-black dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <X width="16" height="16" />
                  </button>
                </div>
              </header>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 border-2 border-black dark:border-white">
                      <MessageCircle width="16" height="16" className="text-white dark:text-black" />
                    </div>
                    <div className="border-2 border-black bg-pink-500 p-3 text-white rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)] max-w-[85%]">
                      <p className="text-sm font-medium">{t.greeting}</p>
                    </div>
                  </div>
                )}

                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex items-start gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.role === 'assistant' && (
                      <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 border-2 border-black dark:border-white">
                        <MessageCircle width="16" height="16" className="text-white dark:text-black" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-lg p-3 text-sm ${
                        msg.role === 'user'
                          ? 'border-2 border-black bg-black text-white shadow-[3px_3px_0px_0px_rgba(236,72,153,1)] dark:border-white dark:bg-white dark:text-black dark:shadow-[3px_3px_0px_0px_rgba(236,72,153,1)]'
                          : 'border-2 border-black bg-gray-100 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-900 dark:text-white dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{msg.content}</p>
                      <p className={`mt-1 text-[10px] font-mono ${
                        msg.role === 'user' ? 'text-gray-300 dark:text-gray-600' : 'text-gray-400 dark:text-gray-500'
                      }`}>
                        {formatTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="mt-1 shrink-0 flex h-8 w-8 items-center justify-center rounded-full bg-pink-500 border-2 border-black dark:border-white">
                      <MessageCircle width="16" height="16" className="text-white dark:text-black" />
                    </div>
                    <div className="border-2 border-black bg-gray-100 rounded-lg p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:bg-zinc-900 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,1)]">
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-400">{t.sending}</p>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Footer: WhatsApp CTA + Input */}
              <footer className="border-t-4 border-black bg-gray-50 dark:border-white dark:bg-zinc-900">
                <div className="flex items-center gap-2 px-4 py-2">
                  <a
                    href={WHATSAPP_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 border-2 border-black bg-[#25D366] px-3 py-2 text-xs font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-transform hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  >
                    WhatsApp
                  </a>
                  <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                    {es ? '¿Necesitás atención inmediata?' : 'Need immediate help?'}
                  </span>
                </div>

                <div className="flex items-center gap-2 border-t-2 border-black px-4 py-3 dark:border-white">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={t.placeholder}
                    disabled={isLoading}
                    className="flex-1 border-2 border-black bg-white dark:border-white dark:bg-zinc-800 px-3 py-2 text-sm font-bold outline-none focus:shadow-[2px_2px_0px_0px_rgba(236,72,153,1)] disabled:opacity-50"
                  />
                  <button
                    type="button"
                    onClick={handleSend}
                    disabled={!input.trim() || isLoading}
                    aria-label={t.send}
                    className="shrink-0 border-2 border-black bg-pink-500 p-2 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-pink-600 hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:opacity-40 disabled:hover:translate-0 disabled:hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] dark:hover:shadow-none disabled:hover:translate-0 disabled:hover:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <Send width="18" height="18" />
                  </button>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
