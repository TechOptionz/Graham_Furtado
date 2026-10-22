import { images, type ImageSlot } from './images';

/**
 * Project facts, taken verbatim from the research document (section 3).
 * Do not alter figures. West End is a lodged proposal — never describe it as
 * approved, under construction or complete.
 */

export interface ProjectFact {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  number: string;
  name: string;
  location: string;
  /** Short status badge. */
  statusBadge: string;
  /** Longer status line used where a date is shown. */
  statusLine: string;
  /** Headline count and its unit, e.g. 25 residences. */
  scale: { value: number; unit: string };
  summary: string;
  facts: ProjectFact[];
  image: ImageSlot;
}

export const mira: Project = {
  slug: 'mira-living',
  number: '01',
  name: 'MIRA Living',
  location: 'Bargara, Queensland',
  statusBadge: 'Nearing completion',
  statusLine: 'Nearing completion · Sept 2026',
  scale: { value: 25, unit: 'Residences' },
  summary:
    "MIRA Living is a boutique oceanfront residential development in Bargara, Queensland. The project represents a clear example of Graham's role in residential development, from site opportunity and product positioning through consultant coordination and delivery.",
  facts: [
    { label: 'Address', value: '25–27 Esplanade, Bargara, Queensland' },
    { label: 'Development type', value: 'Boutique oceanfront residential apartments' },
    { label: 'Developer', value: 'Furtado Property' },
    { label: "Graham's public role", value: 'Developer, Furtado Property' },
    { label: 'Status', value: 'Under construction; the MIRA website showed 98% complete in September 2026' },
    { label: 'Completion messaging', value: 'The MIRA website states completion September 2026' },
    { label: 'Positioning', value: 'Premium, owner-occupier oriented coastal living' },
  ],
  image: images.miraHero,
};

export const westEnd: Project = {
  slug: 'west-end',
  number: '02',
  name: 'West End Residential Proposal',
  location: 'West End, Brisbane',
  statusBadge: 'Proposed development',
  statusLine: 'Proposal · Lodged Sept 2026',
  scale: { value: 113, unit: 'Apartments proposed' },
  summary:
    'In September 2026, Furtado Property lodged plans for a substantially larger residential scheme in West End, Brisbane, representing a significant step up in development scale from MIRA Living.',
  facts: [
    { label: 'Site', value: '5 Wolfe Street and 6–8 Greet Street, West End, Brisbane' },
    { label: 'Proposed scale', value: '13 storeys · 113 apartments' },
    { label: 'Apartment mix', value: '92 two-bedroom · 21 three-bedroom residences' },
    { label: 'Developer / applicant', value: 'Furtado Property (FP Margate Pty Ltd)' },
    { label: 'Status', value: 'Lodged with Brisbane City Council · received 9 September 2026' },
    { label: 'Parking & mobility', value: '116 car · 5 motorcycle · 142 bicycle spaces proposed' },
  ],
  image: images.westEndHero,
};

/** Consultant team named in public coverage of the West End application. */
export const westEndTeam: ProjectFact[] = [
  { label: 'Architect', value: 'MAS Architecture' },
  { label: 'Town planner', value: 'Urbicus' },
  { label: 'Landscape architect', value: 'AS Design' },
  { label: 'Traffic / waste', value: 'BMC Traffic' },
  { label: 'Civil / stormwater / flood', value: 'CDS' },
];

export const westEndStoreys = 13;

export const westEndNotice =
  'Proposed development. Lodged with Brisbane City Council and received 9 September 2026. Not approved, under construction or completed.';

/** Slots for future projects. None have been announced — do not fill with invented projects. */
export const futureProjectSlots = ['03', '04', '05'];
