/**
 * Timeline for the About page "three decades" section.
 *
 * Only milestones supported by the research document are listed. There are no
 * confirmed years for Graham's early career or the founding of Furtado Property
 * (research section 7: "Exact founding story and preferred founding year wording"
 * to be confirmed), so those entries are shown without dates. Do not add dates
 * here until Graham confirms them.
 */
export interface Milestone {
  /** Short caps label: a confirmed date, or a place/organisation where no date is confirmed. */
  label: string;
  text: string;
}

export const milestones: Milestone[] = [
  { label: 'Brisbane', text: 'Residential real estate' },
  { label: 'Furtado Property', text: 'Residential development, South-East Queensland' },
  { label: '2026', text: 'MIRA Living, Bargara — completed' },
  { label: '9 Sept 2026', text: 'West End proposal lodged with Brisbane City Council' },
];
