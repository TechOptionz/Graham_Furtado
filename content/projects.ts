import { images, type ImageSlot } from './images';

/**
 * Project facts, taken verbatim from the research document (section 3).
 * Do not alter figures. West End is a lodged proposal — never describe it as
 * approved, under construction or complete.
 *
 * Mount Gravatt: facts from the MAS Architecture DA report (August 2026) and
 * Graham's covering note (27 Oct 2026): 5 levels, 30 units, construction to
 * commence early 2027. The project name is NOT yet decided — the working title
 * in the report must not be used anywhere on the site until confirmed.
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
  /** Headline count and its unit, e.g. 25 residences. Omitted until confirmed. */
  scale?: { value: number; unit: string };
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

export const mtGravatt: Project = {
  slug: 'mt-gravatt',
  number: '03',
  name: 'Mount Gravatt Residential Project',
  location: 'Mount Gravatt, Brisbane',
  statusBadge: 'Construction early 2027',
  statusLine: 'Development application · Construction early 2027',
  scale: { value: 30, unit: 'Residences' },
  summary:
    'A five-level, 30-residence apartment building at 32\u201334 Lauder Street, Mount Gravatt, on Brisbane\u2019s southside. Set on a quiet street a short walk from the Logan Road corridor, the design pairs deep, screened balconies with rooftop and facade planting, drawing on the bushland and lookout of Mount Gravatt itself. Construction is scheduled to commence in early 2027.',
  facts: [
    { label: 'Site', value: '32\u201334 Lauder Street, Mount Gravatt East, Queensland 4122' },
    { label: 'Development type', value: 'Residential apartments' },
    { label: 'Scale', value: '5 levels \u00b7 30 residences' },
    { label: 'Developer', value: 'Furtado Property' },
    { label: 'Status', value: 'Development application prepared August 2026 \u00b7 Brisbane City Council' },
    { label: 'Construction', value: 'Scheduled to commence early 2027' },
    { label: 'Location', value: 'Approx. 4.5 km from the Brisbane CBD \u00b7 near Griffith University, Mount Gravatt Lookout and Mount Gravatt Plaza' },
  ],
  image: images.mtGravattHero,
};

export const mtGravattLevels = 5;

/** Consultant team named in the DA report (August 2026). */
export const mtGravattTeam: ProjectFact[] = [
  { label: 'Architect', value: 'MAS Architecture' },
  { label: 'Town planner', value: 'Urbicus' },
  { label: 'Landscape architect', value: 'AS Design' },
  { label: 'Traffic / waste', value: 'BMC Traffic' },
  { label: 'Civil engineer', value: 'Coordinated Development Solutions' },
];

export const mtGravattNotice =
  'Project name to be announced. Images are artist\u2019s impressions from the August 2026 development application report and are subject to change. Details will be updated as the project progresses.';
