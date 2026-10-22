'use client';

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import styles from './ChatWidget.module.css';

type Message = { role: 'user' | 'assistant'; text: string; error?: boolean };

const SESSION_KEY = 'grahamfurtado_chat_session_id';
const GREETING = 'Hi, I’m Graham’s assistant. Ask me about his developments, services or how to get in touch.';

function getSessionId(): string {
  try {
    let id = localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `chat_${crypto.randomUUID()}`;
      localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return `chat_${crypto.randomUUID()}`; // storage blocked — per-page session
  }
}

/**
 * Floating chat answered by Aleesa Web Chat via /api/chat.
 * The server holds the key; this only sends the visitor's latest message.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: GREETING }]);
  const [draft, setDraft] = useState('');
  const [pending, setPending] = useState(false);
  const sessionRef = useRef<string | null>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [messages, pending]);

  const close = () => {
    setOpen(false);
    toggleRef.current?.focus();
  };

  const send = async (event?: FormEvent) => {
    event?.preventDefault();
    const text = draft.trim();
    if (!text || pending) return;

    sessionRef.current ??= getSessionId();
    setMessages((current) => [...current, { role: 'user', text }]);
    setDraft('');
    setPending(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, sessionId: sessionRef.current, page: location.pathname }),
      });
      const data = await response.json().catch(() => null);
      if (!response.ok || typeof data?.content !== 'string') {
        const reason = data?.notConfigured
          ? 'Chat isn’t switched on yet. Please use the contact form in the meantime.'
          : 'Sorry, the assistant is unavailable right now. Please try again shortly or use the contact form.';
        setMessages((current) => [...current, { role: 'assistant', text: reason, error: true }]);
      } else {
        setMessages((current) => [...current, { role: 'assistant', text: data.content }]);
      }
    } catch {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: 'Sorry, the message couldn’t be sent. Please check your connection and try again.', error: true },
      ]);
    } finally {
      setPending(false);
      inputRef.current?.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      void send();
    }
    if (event.key === 'Escape') close();
  };

  return (
    <div className={styles.root}>
      {open && (
        <section id="chat-panel" className={styles.panel} role="dialog" aria-label="Chat with Graham’s assistant" onKeyDown={(e) => e.key === 'Escape' && close()}>
          <header className={styles.head}>
            <div>
              <p className={styles.eyebrow}>Chat</p>
              <p className={styles.title}>Graham&rsquo;s assistant</p>
            </div>
            <button type="button" className={styles.close} onClick={close} aria-label="Close chat">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </header>

          <div ref={logRef} className={styles.log} role="log" aria-live="polite">
            {messages.map((message, index) => (
              <p
                key={index}
                className={`${styles.bubble} ${message.role === 'user' ? styles.user : styles.assistant} ${message.error ? styles.error : ''}`}
              >
                {message.text}
              </p>
            ))}
            {pending && (
              <p className={`${styles.bubble} ${styles.assistant} ${styles.typing}`} aria-label="Assistant is typing">
                <span />
                <span />
                <span />
              </p>
            )}
          </div>

          <form className={styles.composer} onSubmit={send}>
            <label htmlFor="chat-input" className="visually-hidden">
              Your message
            </label>
            <textarea
              id="chat-input"
              ref={inputRef}
              className={styles.input}
              rows={1}
              maxLength={2000}
              placeholder="Type your message…"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={onKeyDown}
            />
            <button type="submit" className={styles.send} disabled={pending || !draft.trim()} aria-label="Send message">
              <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true">
                <path d="M2 8h11M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" fill="none" />
              </svg>
            </button>
          </form>
        </section>
      )}

      <button
        ref={toggleRef}
        type="button"
        className={styles.toggle}
        onClick={() => (open ? close() : setOpen(true))}
        aria-expanded={open}
        aria-controls="chat-panel"
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        {open ? (
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
            <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" fill="none" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M4 5h16v11H9l-5 4V5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" fill="none" />
          </svg>
        )}
      </button>
    </div>
  );
}
