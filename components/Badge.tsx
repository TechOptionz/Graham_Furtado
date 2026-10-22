interface BadgeProps {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
}

/** Small uppercase status tag laid over project imagery. */
export function Badge({ children, variant = 'light' }: BadgeProps) {
  return <span className={`badge badge--${variant}`}>{children}</span>;
}

export function BadgeGroup({ children }: { children: React.ReactNode }) {
  return <div className="badge-group">{children}</div>;
}
