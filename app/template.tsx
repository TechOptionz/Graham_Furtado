import { ViewTransition } from 'react';

/**
 * Re-mounts on every navigation. Where the View Transitions API is supported,
 * React runs page changes through it: the old page fades out (~200ms) while the
 * header stays continuous and the active nav underline travels to its new item
 * (see .activeLine in SiteHeader and ::view-transition rules in globals.css).
 * The new page's heading then rises into place. Browsers without support fall
 * back to a short CSS fade on .page-enter.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransition enter="page-in" exit="page-out" default="none">
      <div className="page-enter">{children}</div>
    </ViewTransition>
  );
}
