import { queenslandMap as map } from '@/content/generated/queensland-map';
import styles from './QueenslandMap.module.css';

const places = [
  { key: 'bargara', name: 'Bargara', sub: 'MIRA Living', point: map.places.bargara, dx: 14, dy: -6 },
  { key: 'brisbane', name: 'Brisbane', sub: 'West End · Mt Gravatt', point: map.places.brisbane, dx: 14, dy: 4 },
] as const;

/**
 * Static SVG map of Queensland. Geometry is pre-computed at build time by
 * scripts/generate-queensland-map.mjs, so no mapping library ships to the browser.
 *
 * As it scrolls into view it tells a short story (CSS only, once, no loops):
 * the Queensland outline draws → the South-East Queensland zone fades in →
 * Brisbane, then Bargara, appear → Brisbane's ring expands once and settles.
 * `data-pin` markers pair with `data-place` rows on the About page for hover.
 */
export function QueenslandMap() {
  const { seq } = map;
  return (
    <figure className={styles.figure} data-reveal data-motion="custom">
      <svg
        viewBox={`0 0 ${map.width} ${map.height}`}
        className={styles.svg}
        role="img"
        aria-labelledby="qld-map-title qld-map-desc"
      >
        <title id="qld-map-title">Map of Queensland</title>
        <desc id="qld-map-desc">
          Queensland, Australia, marking Brisbane (West End proposal and Mount Gravatt), the South-East Queensland region and Bargara
          near Bundaberg (MIRA Living).
        </desc>
        <defs>
          <clipPath id="qld-clip">
            <path d={map.queensland} />
          </clipPath>
        </defs>
        <path d={map.australia} className={styles.australia} />
        <path d={map.australia} clipPath="url(#qld-clip)" className={styles.queensland} />
        <path d={map.australia} clipPath="url(#qld-clip)" className={styles.outline} pathLength={1} />
        <path d={map.border} className={styles.border} />

        <g className={styles.seqGroup} data-pin="seq">
          <circle cx={seq.cx} cy={seq.cy} r={seq.r} className={styles.seq} />
          <text x={seq.cx - seq.r - 8} y={seq.cy + 4} textAnchor="end" className={styles.smallLabel}>
            SOUTH-EAST QUEENSLAND
          </text>
        </g>

        {places.map(({ key, name, sub, point: [x, y], dx, dy }) => (
          <g key={key} className={`${styles.pin} ${styles[key]}`} data-pin={key}>
            <circle cx={x} cy={y} r={20} className={styles.hit} />
            <circle cx={x} cy={y} r={9} className={styles.ring} />
            <circle cx={x} cy={y} r={3.5} className={styles.dot} />
            <text x={x + dx} y={y + dy} className={styles.placeLabel}>
              {name}
            </text>
            <text x={x + dx} y={y + dy + 16} className={styles.smallLabel}>
              {sub.toUpperCase()}
            </text>
          </g>
        ))}

        <text x={map.width * 0.08} y={map.height * 0.97} className={`${styles.smallLabel} ${styles.caption}`}>
          QUEENSLAND · AUSTRALIA
        </text>
      </svg>
    </figure>
  );
}
