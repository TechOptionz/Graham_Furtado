import { images, type ImageSlot } from './images';

export interface Principle {
  number: string;
  label: string;
  heading: string;
  body: string;
  image: ImageSlot;
  /** Frame proportions from the design: landscape on the left, portrait on the right. */
  aspect: '5/4' | '4/5';
}

/** Six principles, wording from design/Approach.dc.html. */
export const principles: Principle[] = [
  {
    number: '01',
    label: 'Site',
    heading: 'Finding the right opportunity.',
    body: 'Every project begins with the process of finding the right site before anything is progressed. Location, context and the potential a site holds are considered first, because the quality of the opportunity shapes everything that follows.',
    image: images.approachSite,
    aspect: '5/4',
  },
  {
    number: '02',
    label: 'Strategy',
    heading: 'Understanding the market before shaping the product.',
    body: 'Market fit, location, target market and development direction are settled early. Long-term real-estate experience informs the project direction, product positioning and the residential offer, so the development answers a real gap rather than assuming one.',
    image: images.approachStrategy,
    aspect: '4/5',
  },
  {
    number: '03',
    label: 'Design',
    heading: 'Creating places designed to remain relevant.',
    body: 'Furtado Property partners with experienced architects and designers and focuses on lasting workmanship and design. The intent is buildings that remain relevant over time and make an architectural contribution to their local community.',
    image: images.approachDesign,
    aspect: '5/4',
  },
  {
    number: '04',
    label: 'Coordination',
    heading: 'Bringing the right specialists together.',
    body: 'Architects, designers, planners, engineers, builders, sales teams and other specialists are coordinated as one team, with the development vision and the end-user outcome held constant throughout.',
    image: images.approachCoordination,
    aspect: '4/5',
  },
  {
    number: '05',
    label: 'Delivery',
    heading: 'Turning development intent into a finished residential outcome.',
    body: 'The process runs from site identification through to handing over the keys. Responsibility does not stop at approval; it continues through construction, market delivery and the quality of the finished home.',
    image: images.approachDelivery,
    aspect: '5/4',
  },
  {
    number: '06',
    label: 'People',
    heading: 'Designing around how people ultimately live.',
    body: 'Project material emphasises the quality of the finished home and how people will live in it, not only the building as an asset. Residential environments are shaped around the experience of the people who ultimately occupy them.',
    image: images.approachPeople,
    aspect: '4/5',
  },
];

export interface Step {
  marker: string;
  label: string;
  /** Short supporting line (from the single-page design prototype). */
  description?: string;
}

/** Home-page philosophy (labels: design/Home.dc.html; lines: design/Graham Furtado.dc.html). */
export const philosophySteps: Step[] = [
  { marker: '01', label: 'Site', description: 'Finding the right opportunity.' },
  { marker: '02', label: 'Strategy', description: 'Understanding the market, location and development potential.' },
  { marker: '03', label: 'Design', description: 'Working with experienced architects and designers.' },
  { marker: '04', label: 'Delivery', description: 'Coordinating specialist teams throughout the development journey.' },
  { marker: '05', label: 'Quality', description: 'Focusing on lasting workmanship and considered design.' },
  { marker: '06', label: 'People', description: 'Creating residential environments around how people ultimately live.' },
];

/** Development journey (design/Approach.dc.html). */
export const journeySteps: Step[] = [
  { marker: 'i', label: 'Opportunity' },
  { marker: 'ii', label: 'Site' },
  { marker: 'iii', label: 'Strategy' },
  { marker: 'iv', label: 'Design' },
  { marker: 'v', label: 'Consultants' },
  { marker: 'vi', label: 'Delivery' },
  { marker: 'vii', label: 'Market' },
];

/** Specialists named in principle 04 (Coordination), shown as a list. */
export const coordinationRoles = ['Architects', 'Designers', 'Planners', 'Engineers', 'Builders', 'Sales teams'];
