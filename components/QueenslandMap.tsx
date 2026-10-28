import { queenslandMap as map } from '@/content/generated/queensland-map';
import styles from './QueenslandMap.module.css';

const places = [
  { key: 'bargara', name: 'Bargara', sub: 'MIRA Living', point: map.places.bargara, dx: 18, dy: -6 },
  { key: 'brisbane', name: 'Brisbane', sub: 'West End · Mt Gravatt', point: map.places.brisbane, dx: 18, dy: 4 },
] as const;

/**
 * Static SVG map of Queensland. Geometry is pre-computed at build time by
 * scripts/generate-queensland-map.mjs, so no mapping library ships to the browser.
 *
 * As it scrolls into view it tells a short story (CSS only, once, no loops):
 * the sea and graticule settle, the Queensland coastline draws → the South-East Queensland zone fades in →
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
          {/* Water deepens away from the coast: pale teal inshore, a touch darker at the frame edge. */}
          <radialGradient id="qld-sea" cx="42%" cy="48%" r="75%">
            <stop offset="0" stopColor="var(--olive)" stopOpacity="0.07" />
            <stop offset="0.6" stopColor="var(--olive)" stopOpacity="0.13" />
            <stop offset="1" stopColor="var(--olive)" stopOpacity="0.22" />
          </radialGradient>
        </defs>

        {/* Sea, graticule, then land: the continent muted, Queensland lifted in sand. */}
        <rect width={map.width} height={map.height} className={styles.sea} />
        <rect width={map.width} height={map.height} fill="url(#qld-sea)" className={styles.seaDepth} />
        <path d={map.graticule} className={styles.graticule} />
        <path d={map.australia} className={styles.australia} />
        <path d={map.australia} className={styles.coast} />
        <path d={map.australia} clipPath="url(#qld-clip)" className={styles.queensland} />
        <path d={map.australia} clipPath="url(#qld-clip)" className={styles.outline} pathLength={1} />
        <path d={map.border} className={styles.border} />

        <g className={styles.seaLabels} aria-hidden="true">
          <text x={map.seas.coralSea[0]} y={map.seas.coralSea[1]} textAnchor="middle" className={styles.seaLabel}>
            Coral Sea
          </text>
          <text x={map.seas.gulf[0]} y={map.seas.gulf[1]} textAnchor="middle" className={styles.seaLabel}>
            <tspan x={map.seas.gulf[0]}>Gulf of</tspan>
            <tspan x={map.seas.gulf[0]} dy="15">Carpentaria</tspan>
          </text>
        </g>

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
        <rect x="0.5" y="0.5" width={map.width - 1} height={map.height - 1} className={styles.frame} />
      </svg>
    </figure>
  );
}
