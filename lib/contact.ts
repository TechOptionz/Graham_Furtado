export const enquiryTypes = [
  { value: 'site-opportunity', label: 'Site opportunity' },
  { value: 'joint-venture', label: 'Joint venture' },
  { value: 'development-advisory', label: 'Development advisory' },
  { value: 'real-estate-advisory', label: 'Real estate advisory' },
  { value: 'other', label: 'Other' },
] as const;

export interface ContactEnquiry {
  name: string;
  email: string;
  phone: string;
  company: string;
  enquiry: string;
  message: string;
}

export type ContactField = keyof ContactEnquiry;
export type ContactErrors = Partial<Record<ContactField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^[+()\d\s-]{6,20}$/;

export function validateEnquiry(values: ContactEnquiry): ContactErrors {
  const errors: ContactErrors = {};
  if (!values.name.trim()) errors.name = 'Please enter your name.';
  if (!values.email.trim()) errors.email = 'Please enter your email address.';
  else if (!EMAIL_PATTERN.test(values.email.trim())) errors.email = 'Please enter a valid email address, e.g. name@example.com.';
  if (values.phone.trim() && !PHONE_PATTERN.test(values.phone.trim()))
    errors.phone = 'Please enter a valid phone number using digits, spaces, +, ( ) or -.';
  if (!values.enquiry) errors.enquiry = 'Please choose the nature of your enquiry.';
  if (values.message.trim().length > 4000) errors.message = 'Please keep your message under 4,000 characters.';
  return errors;
}

export type SubmitResult = { status: 'sent' } | { status: 'not-configured' } | { status: 'error'; message: string };

/**
 * Sends an enquiry to the configured endpoint.
 *
 * TODO: Connect contact form to approved email/form provider. Until
 * NEXT_PUBLIC_CONTACT_ENDPOINT is set, nothing is sent and the form tells the
 * visitor so — it must never claim a message was delivered.
 */
export async function submitEnquiry(values: ContactEnquiry): Promise<SubmitResult> {
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT;
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return { status: 'not-configured' };
  }
  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    if (!response.ok) return { status: 'error', message: 'The enquiry could not be sent. Please try again shortly.' };
    return { status: 'sent' };
  } catch {
    return { status: 'error', message: 'The enquiry could not be sent. Please check your connection and try again.' };
  }
}
