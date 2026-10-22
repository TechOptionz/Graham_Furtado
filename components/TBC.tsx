import type { ReactNode } from 'react';

/**
 * Marks information that is missing or awaiting confirmation. Visible on the
 * page so it cannot slip through to launch unnoticed — search the codebase for
 * `<TBC` to find every outstanding item.
 */
export function TBC({ children }: { children: ReactNode }) {
  return <span className="tbc">[{children}]</span>;
}
