/**
 * Image slots used across the site. A slot with `src` renders the image via
 * next/image; a slot without one renders a styled placeholder at the same
 * proportions, so adding an image never changes the layout.
 *
 * To add an image: put the file in /public/images/ and set `src` (e.g.
 * '/images/example.jpg') plus a descriptive `alt`. Use `position` to set the
 * crop focal point when the default centre crop cuts off the subject.
 *
 * Never use generated portraits, stock photos presented as Graham, or
 * fictional project photography.
 */

export interface ImageSlot {
  /** Placeholder label shown until an approved image is supplied. */
  label: string;
  src?: string;
  alt?: string;
  /** CSS object-position focal point for cropping, e.g. 'center 30%'. */
  position?: string;
  /** 'contain' shows the whole image (drawings, plans); default 'cover' crops to fill. */
  fit?: 'cover' | 'contain';
  /** next/image quality; must be listed in next.config images.qualities (75 default, 90 for renders/drawings). */
  quality?: 75 | 90;
}

/** Supplied project photography, renders and drawings. */
const photos = {
  // MIRA Living, Bargara — photography
  miraCoastline: {
    src: '/images/mira-2.jpg',
    alt: 'Aerial photograph of the Bargara coastline, with its rocky foreshore, beach and coastal residential streets',
  },
  miraBuilding: {
    src: '/images/mira-3.jpg',
    alt: 'Aerial photograph of the MIRA Living building on the Bargara foreshore',
  },
  miraLiving: {
    src: '/images/mira-5.jpg',
    alt: 'MIRA Living residence: open-plan living room with stone coffee table, leading through to the dining area and kitchen',
  },
  miraDining: {
    src: '/images/mira-6.jpg',
    alt: 'MIRA Living residence: dining and living area opening onto a balcony through full-height glass doors',
  },
  miraKitchen: {
    src: '/images/mira-1.jpg',
    alt: 'MIRA Living residence: kitchen with timber joinery and a marble-look island bench',
  },
  miraBedroom: {
    src: '/images/mira-8.jpg',
    alt: 'MIRA Living residence: light-filled bedroom with a linen-dressed bed and timber bedside tables',
  },
  // MIRA Living — earlier render
  miraFacade: {
    src: '/images/mira-living-facade-dusk.png',
    alt: 'Render of MIRA Living, Bargara: the street elevation at dusk, framed by palms',
  },

  /** Construction-stage aerial. Has the MIRA Living logo baked in — use sparingly. */
  miraConstruction: {
    src: '/images/mira-living-aerial-bargara.png',
    alt: 'Aerial photograph of the Bargara coastline marking the MIRA Living site during construction',
  },

  // West End Residential Proposal, Brisbane — renders and drawings (proposal only).
  // TODO(assets): west-1 … west-8 are raster exports of the council DA PDF (2480×1754 = A4 at 300 dpi),
  // not original renders — detail is soft and drawings are JPEG. Request the original renders
  // (≥3000px JPG/PNG) and PNG drawing exports (200–300 dpi) from MAS Architecture, then replace
  // these files. Quality 90 limits further re-compression in the meantime.
  westEndElevation: {
    src: '/images/west-5.jpg',
    alt: 'Architectural render of the proposed West End residential tower, seen from the street with planted balconies',
    quality: 90,
  },
  westEndTower: {
    src: '/images/west-7.jpg',
    alt: 'Architectural render of the proposed West End tower at dusk in its Brisbane street context',
    quality: 90,
  },
  westEndUndercroft: {
    src: '/images/west-6.jpg',
    alt: 'Architectural render of the proposed West End undercroft: brick piers, timber-battened ceiling and a paved entry',
    quality: 90,
  },
  westEndEntry: {
    src: '/images/west-1.jpg',
    alt: 'Architectural render of the proposed West End street entry, with landscaped verge and timber-lined canopy',
    quality: 90,
  },
  westEndFrontage: {
    src: '/images/west-8.jpg',
    alt: 'Architectural render of the proposed West End street frontage, with a landscaped drop-off beneath the building',
    quality: 90,
  },
  westEndSite: {
    src: '/images/west-4.jpg',
    alt: 'Aerial site plan outlining the West End site at 5 Wolfe Street and 6–8 Greet Street',
    fit: 'contain',
    quality: 90,
  },
  westEndLandscapePlan: {
    src: '/images/west-2.jpg',
    alt: 'Landscape plan drawing for the proposed West End scheme, showing communal spaces and planting',
    fit: 'contain',
    quality: 90,
  },
  westEndSection: {
    src: '/images/west-3.jpg',
    alt: 'Building section drawing of the proposed 13-storey West End scheme along Wolfe Street',
    fit: 'contain',
    quality: 90,
  },

  // Illustrative image (not a Furtado Property project).
  coastalLand: {
    src: '/images/img-1.jpg',
    alt: 'Open grassed land among coastal trees, with a residential suburb and the ocean beyond at golden hour',
  },
} satisfies Record<string, Omit<ImageSlot, 'label'>>;


export const images = {
  // Home
  homeHero: {
    label: 'Approved hero image to be supplied — Queensland architecture, coastline or project',
    ...photos.miraCoastline,
    position: 'center 55%',
    quality: 90,
  },
  homeIntro: { label: 'Approved project interior to be supplied', ...photos.miraDining, position: '42% center' },

  // Projects
  miraHero: { label: 'Approved MIRA Living render or photograph to be supplied', ...photos.miraBuilding, position: 'center 45%' },
  miraDetail1: { label: 'Approved MIRA Living interior to be supplied', ...photos.miraLiving },
  miraDetail2: { label: 'Approved MIRA Living interior to be supplied', ...photos.miraKitchen },
  miraDetail3: { label: 'Approved MIRA Living interior to be supplied', ...photos.miraBedroom },
  westEndHero: {
    label: 'Approved West End render or Brisbane context image to be supplied',
    ...photos.westEndElevation,
    position: '50% 40%',
  },
  westEndDetail: { label: 'Approved West End detail image to be supplied', ...photos.westEndEntry, position: '45% center' },
  westEndSite: { label: 'Site plan to be supplied', ...photos.westEndSite },
  westEndLandscapePlan: { label: 'Landscape plan to be supplied', ...photos.westEndLandscapePlan, fit: 'contain' },
  westEndSection: { label: 'Building section to be supplied', ...photos.westEndSection, fit: 'contain' },

  // About
  portrait: { label: 'Approved Graham Furtado portrait to be supplied' },

  // Approach
  approachSite: { label: 'Approved site image to be supplied', ...photos.westEndSite },
  approachStrategy: { label: 'Approved Brisbane residential context image to be supplied', ...photos.westEndTower, position: '40% center' },
  approachDesign: { label: 'Approved architectural detail image to be supplied', ...photos.westEndUndercroft, position: 'center 55%' },
  approachCoordination: { label: 'Approved drawings to be supplied', ...photos.westEndSection },
  approachDelivery: { label: 'Approved delivery image to be supplied', ...photos.miraBuilding, position: 'center 50%' },
  approachPeople: { label: 'Approved residential interior to be supplied', ...photos.miraLiving, position: 'center 60%' },

  expertiseBreakWide: { label: 'Approved coordination image to be supplied', ...photos.westEndLandscapePlan, position: '40% center' },
  expertiseBreakDetail: { label: 'Approved project detail image to be supplied', ...photos.westEndEntry, position: '55% center' },

  // Closing CTA bands
  ctaHome: { label: 'Approved closing image to be supplied', ...photos.westEndFrontage, position: 'center 60%' },
  ctaDevelopments: { label: 'Approved closing image to be supplied', ...photos.coastalLand, position: 'center 60%' },
  ctaExpertise: { label: 'Approved closing image to be supplied', ...photos.miraFacade, position: 'center 50%' },
  ctaApproach: { label: 'Approved closing image to be supplied', ...photos.miraCoastline, position: 'center 60%' },

  // Contact panel: Graham's portrait replaces this once supplied (see app/contact/page.tsx).
  contactPanel: { label: 'Approved portrait or project image to be supplied', ...photos.miraFacade, position: 'center 50%', quality: 90 },

} satisfies Record<string, ImageSlot>;

/** Expertise: one real project image per core service row, in order (sticky panel on desktop). */
export const expertiseRowImages: ImageSlot[] = [
  { label: 'MIRA Living aerial', ...photos.miraBuilding, position: 'center 45%' },
  { label: 'West End render', ...photos.westEndElevation, position: '50% 40%' },
  { label: 'West End site aerial', ...photos.westEndSite },
  { label: 'West End landscape plan', ...photos.westEndLandscapePlan },
  // A construction-stage image would suit this row best; the only one (miraConstruction) has a
  // logo baked in that no 4:5 crop avoids, so a West End render stands in until one is supplied.
  { label: 'West End undercroft render', ...photos.westEndUndercroft, position: '60% center' },
  { label: 'West End building section', ...photos.westEndSection },
  { label: 'Bargara coastline', ...photos.miraCoastline, position: 'center 60%' },
  { label: 'MIRA Living interior', ...photos.miraLiving },
];
