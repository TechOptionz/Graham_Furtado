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
  // MIRA Living, Bargara — completed-building photography supplied 21 Oct 2026 (exported at 2560px, no watermark).
  // The earlier mira-*.jpg set (1920px, agency watermark) and the dusk render are superseded and no longer referenced.
  miraAerialDusk: {
    src: '/images/mira-living-aerial-dusk.jpg',
    alt: 'Aerial photograph of the completed MIRA Living building at dusk, its apartments lit, with the Bargara coastline behind',
  },
  miraCoastSunset: {
    src: '/images/mira-living-coast-sunset.jpg',
    alt: 'Aerial photograph of MIRA Living on the Bargara foreshore at sunset, looking out over the ocean',
  },
  miraAerialFront: {
    src: '/images/mira-living-aerial-front.jpg',
    alt: 'Aerial photograph of the MIRA Living street elevation and landscaped frontage at dusk',
  },
  miraAerialPortrait: {
    src: '/images/mira-living-aerial-portrait.jpg',
    alt: 'Aerial photograph looking down on the MIRA Living building and its palm-lined entry at dusk',
  },
  miraStreet: {
    src: '/images/mira-living-street.jpg',
    alt: 'The completed MIRA Living building from the street: five storeys of balconies above new garden beds and lawn',
  },
  miraEntry: {
    src: '/images/mira-living-entry.jpg',
    alt: 'MIRA Living entry: the glazed lobby door beside the building name, with the mail boxes to one side',
  },
  miraPool: {
    src: '/images/mira-living-pool-terrace.jpg',
    alt: 'MIRA Living pool terrace, the sky and palms reflected in the water, with neighbouring buildings beyond',
  },
  miraLivingRoom: {
    src: '/images/mira-living-living-room.jpg',
    alt: 'MIRA Living residence: living room with a linen sofa and travertine coffee table, opening to a balcony with ocean views',
  },
  miraKitchen: {
    src: '/images/mira-living-kitchen.jpg',
    alt: 'MIRA Living residence: kitchen with walnut joinery, a stone island bench and bar stools',
  },
  miraBedroom: {
    src: '/images/mira-living-bedroom.jpg',
    alt: 'MIRA Living residence: bedroom with a linen-dressed bed, bedside lamps and a balcony looking out to the coast',
  },
  miraBalconyDining: {
    src: '/images/mira-living-balcony-dining.jpg',
    alt: 'MIRA Living residence: balcony dining setting with rattan chairs, looking back through to the living room and kitchen',
  },
  miraBalconyView: {
    src: '/images/mira-living-balcony-view.jpg',
    alt: 'View from a MIRA Living balcony across the foreshore pines to the ocean',
  },
  miraDining: {
    src: '/images/mira-living-dining.jpg',
    alt: 'MIRA Living residence: dining table and chairs beside the stone island bench, with framed coastal prints',
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
} satisfies Record<string, Omit<ImageSlot, 'label'>>;


export const images = {
  // Home
  homeHero: {
    label: 'Approved hero image to be supplied — Queensland architecture, coastline or project',
    ...photos.miraAerialDusk,
    position: '42% 45%',
    quality: 90,
  },
  homeIntro: { label: 'Approved project interior to be supplied', ...photos.miraDining },

  // Projects
  miraHero: { label: 'Approved MIRA Living render or photograph to be supplied', ...photos.miraStreet, position: 'center 52%', quality: 90 },
  miraDetail1: { label: 'Approved MIRA Living interior to be supplied', ...photos.miraLivingRoom, position: '55% center' },
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

  // Mount Gravatt — imagery to be supplied by Graham (placeholders render until then).
  mtGravattHero: { label: 'Approved Mount Gravatt render or site image to be supplied' },
  mtGravattDetail: { label: 'Approved Mount Gravatt detail image to be supplied' },
  mtGravattDrawing1: { label: 'Mount Gravatt site plan to be supplied', fit: 'contain' },
  mtGravattDrawing2: { label: 'Mount Gravatt landscape plan to be supplied', fit: 'contain' },
  mtGravattDrawing3: { label: 'Mount Gravatt building section to be supplied', fit: 'contain' },

  // About
  portrait: { label: 'Approved Graham Furtado portrait to be supplied' },

  // Approach
  approachSite: { label: 'Approved site image to be supplied', ...photos.westEndSite },
  approachStrategy: { label: 'Approved Brisbane residential context image to be supplied', ...photos.westEndTower, position: '40% center' },
  approachDesign: { label: 'Approved architectural detail image to be supplied', ...photos.westEndUndercroft, position: 'center 55%' },
  approachCoordination: { label: 'Approved drawings to be supplied', ...photos.westEndSection },
  approachDelivery: { label: 'Approved delivery image to be supplied', ...photos.miraAerialFront, position: 'center 50%' },
  approachPeople: { label: 'Approved residential interior to be supplied', ...photos.miraLivingRoom, position: 'center 60%' },

  expertiseBreakWide: { label: 'Approved coordination image to be supplied', ...photos.westEndLandscapePlan, position: '40% center' },
  expertiseBreakDetail: { label: 'Approved project detail image to be supplied', ...photos.westEndEntry, position: '55% center' },

  // Closing CTA bands
  ctaHome: { label: 'Approved closing image to be supplied', ...photos.westEndFrontage, position: 'center 60%' },
  ctaDevelopments: { label: 'Approved closing image to be supplied', ...photos.miraCoastSunset, position: 'center 65%' },
  ctaExpertise: { label: 'Approved closing image to be supplied', ...photos.miraAerialFront, position: 'center 55%' },
  ctaApproach: { label: 'Approved closing image to be supplied', ...photos.miraPool, position: 'center 60%' },

  // Contact panel: Graham's portrait replaces this once supplied (see app/contact/page.tsx).
  contactPanel: { label: 'Approved portrait or project image to be supplied', ...photos.miraEntry, position: '42% center', quality: 90 },

} satisfies Record<string, ImageSlot>;

/** Expertise: one real project image per core service row, in order (sticky panel on desktop). */
export const expertiseRowImages: ImageSlot[] = [
  { label: 'MIRA Living aerial', ...photos.miraAerialPortrait, position: 'center 45%' },
  { label: 'West End render', ...photos.westEndElevation, position: '50% 40%' },
  { label: 'West End site aerial', ...photos.westEndSite },
  // Not the landscape plan: the specialists break directly below opens with that same drawing.
  { label: 'MIRA Living coastline at sunset', ...photos.miraCoastSunset, position: '28% 62%' },
  // A construction-stage image would suit this row best; the only one (miraConstruction) has a
  // logo baked in that no 4:5 crop avoids, so a West End render stands in until one is supplied.
  { label: 'West End undercroft render', ...photos.westEndUndercroft, position: '60% center' },
  { label: 'West End building section', ...photos.westEndSection },
  { label: 'MIRA Living balcony view', ...photos.miraBalconyView, position: 'center 40%' },
  { label: 'MIRA Living balcony dining', ...photos.miraBalconyDining, position: '38% center' },
];
