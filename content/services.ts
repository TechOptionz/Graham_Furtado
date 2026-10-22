/**
 * Service framework from the research document (section 4). These describe
 * work publicly associated with Graham and Furtado Property; they are a
 * positioning framework, not confirmation of standalone engagements.
 */

export interface Service {
  title: string;
  description: string;
  /** Qualifying note shown beneath the description. */
  note?: string;
  /** Where this area is shown in practice (project or Approach step). */
  href?: string;
}

export const coreServices: Service[] = [
  {
    title: 'Property Development',
    href: '/developments',
    description:
      'Residential development from early opportunity and site stage through design coordination, delivery and market completion.',
  },
  {
    title: 'Residential Development Strategy',
    href: '/approach#principle-02',
    description: 'Project direction, target market, product positioning, development priorities and residential offer.',
  },
  {
    title: 'Site Identification & Opportunity Assessment',
    href: '/approach#principle-01',
    description: 'Recognising locations and sites with potential and considering market gaps and development fit.',
  },
  {
    title: 'Development Feasibility & Early-Stage Advisory',
    href: '/approach#principle-02',
    description:
      'High-level assessment of market fit, site potential, product direction and development opportunity.',
    note: 'High-level only; detailed financial or planning services are not implied.',
  },
  {
    title: 'Development Management',
    href: '/approach#principle-04',
    description:
      'Coordinating architects, designers, planners, engineers, builders, sales teams and other project specialists.',
  },
  {
    title: 'Design & Consultant Coordination',
    href: '/approach#principle-03',
    description: 'Bringing together specialist teams while maintaining the development vision and end-user outcome.',
  },
  {
    title: 'Property Market Advisory',
    href: '/about',
    description:
      'Applying long-term real-estate experience to location, buyer, residential-market and product decisions.',
  },
  {
    title: 'Residential Real Estate Advisory',
    href: '/about',
    description: 'Strategic property guidance informed by extensive real-estate experience.',
    note: "Subject to Graham's preferred current service model.",
  },
];

/** Research: "confirm directly before marketing". Never present as offered services. */
export const servicesSubjectToConfirmation: string[] = [
  'Development partnerships and joint ventures',
  'Owner / investor development representation',
  'Off-the-plan sales strategy',
  'Project marketing strategy',
  'Direct buyer or seller representation',
  'Development mentoring / consulting for other landowners or developers',
];

/**
 * Disciplines delivered by specialist consultants on each project. Presented
 * only as coordinated work, never as Graham's own services.
 */
export const specialistDisciplines =
  'Architecture, town planning, engineering, landscape, traffic, construction and property management are delivered by specialist consultants and partners on each project. They are coordinated, not offered directly.';
