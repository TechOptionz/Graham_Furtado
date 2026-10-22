'use client';

import { useState } from 'react';

/** Email link with a small copy-to-clipboard control ("Copied" for 1.5s). */
export function CopyEmail({ email, className, buttonClassName }: { email: string; className?: string; buttonClassName?: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard unavailable (permissions/insecure context): the mailto link still works.
    }
  };

  return (
    <span className={className}>
      <a href={`mailto:${email}`}>{email}</a>{' '}
      <button type="button" onClick={copy} className={buttonClassName} aria-live="polite">
        {copied ? 'Copied' : 'Copy'}
      </button>
    </span>
  );
}
