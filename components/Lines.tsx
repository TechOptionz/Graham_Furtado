import type { ReactNode } from 'react';

/**
 * Renders a heading's lines as masked rows so each can rise into view in turn
 * (see `[data-motion='lines']` in globals.css). Use only where line breaks are
 * intentional and fixed; everywhere else headings reveal as a whole.
 */
export function Lines({ lines }: { lines: ReactNode[] }) {
  return (
    <>
      {lines.map((line, i) => (
        <span key={i} className="line" style={{ ['--line-i' as string]: i }}>
          <span>{line}</span>
        </span>
      ))}
    </>
  );
}
