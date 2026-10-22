import { NextResponse } from 'next/server';

/**
 * Chat widget → Aleesa Web Chat.
 *
 * Browser → this route → Aleesa. The Web Chat key is server-only and never
 * reaches the browser. Aleesa is stateful (transcript, knowledge base and
 * persona live there), so only the latest message and a stable session id are
 * forwarded.
 */

const PATH = '/webhooks/web-chat';

function endpoint(): string | null {
  const configured = (process.env.ALEESA_WEBHOOK_URL ?? '').trim().replace(/\/+$/, '');
  if (!configured) return null;
  const base = configured.endsWith(PATH) ? configured.slice(0, -PATH.length) : configured;
  return `${base}${PATH}`;
}

function siteHost(): string {
  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? '').host || 'grahamfurtado';
  } catch {
    return 'grahamfurtado';
  }
}

const clean = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) || undefined : undefined;

export async function POST(request: Request) {
  const url = endpoint();
  const apiKey = process.env.ALEESA_WEBCHAT_API_KEY?.trim();
  if (!url || !apiKey) {
    return NextResponse.json({ error: 'Chat is not available yet.', notConfigured: true }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const text = clean(body?.text, 2000);
  if (!text) return NextResponse.json({ error: 'Message required.' }, { status: 400 });

  // Browser-supplied — restrict shape and length before it reaches Aleesa.
  const rawSession = clean(body?.sessionId, 64);
  const sessionId = rawSession && /^[A-Za-z0-9_-]+$/.test(rawSession) ? rawSession : `chat_${crypto.randomUUID()}`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        apiKey,
        sessionId,
        text,
        metadata: { source: 'website-widget', site: siteHost(), page: clean(body?.page, 200) },
      }),
      signal: AbortSignal.timeout(30_000),
    });

    if (!response.ok) throw new Error(`Aleesa Web Chat responded ${response.status}`);
    const data = await response.json();
    // Aleesa can answer 200 with success: false (bad key, Web Chat disabled).
    if (data?.success === false) throw new Error(`Aleesa rejected the request: ${data.message ?? ''}`);

    const reply = typeof data?.reply === 'string' ? data.reply.trim() : '';
    if (!reply) throw new Error('Aleesa returned no reply');

    return NextResponse.json({ content: reply, sessionId });
  } catch (error) {
    console.error('[chat] Aleesa failed', error); // never expose internals to the browser
    return NextResponse.json({ error: 'The assistant is unavailable right now.' }, { status: 502 });
  }
}
