/**
 * Site-wide identity and contact details.
 *
 * Source of truth for facts: "Graham Furtado — Research and Service Profile"
 * (design/uploads). Anything the research marks as "confirm directly with
 * Graham" is flagged here with `confirmed: false` or left `null`, so it can be
 * finalised in one place before launch.
 */

export const site = {
  name: 'Graham Furtado',
  company: 'Furtado Property',

  /**
   * Working positioning recommended by the research. The research states the
   * final formal title must be confirmed with Graham (section 7).
   */
  positioning: {
    confirmed: false,
    headline: 'Property Developer & Real Estate Professional',
    titles: ['Property Developer', 'Real Estate Professional', 'Development Advisor'] as const,
  },

  experience: {
    /** Research-recommended wording; exact years to be confirmed with Graham. */
    summary: 'around three decades',
  },

  regions: ['Brisbane', 'South-East Queensland', 'Bargara'] as const,
  based: 'Queensland, Australia',

  /** No contact details have been supplied or confirmed. Keep null until approved. */
  contact: {
    email: null as string | null,
    phone: null as string | null,
  },

  copyrightYear: 2026,
} as const;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');

/** Placeholder copy for information that is missing or awaiting confirmation. */
export const TBC = {
  contactDetails: 'Contact details to be confirmed',
  email: 'Contact email to be confirmed',
  phone: 'Phone to be confirmed',
  formDelivery: 'Form delivery to be connected',
} as const;
