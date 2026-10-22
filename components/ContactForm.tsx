'use client';

import { useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import {
  enquiryTypes,
  submitEnquiry,
  validateEnquiry,
  type ContactEnquiry,
  type ContactErrors,
  type ContactField,
  type SubmitResult,
} from '@/lib/contact';
import { TBC } from './TBC';
import styles from './ContactForm.module.css';

const initialValues: ContactEnquiry = { name: '', email: '', phone: '', company: '', enquiry: '', message: '' };
const fieldOrder: ContactField[] = ['name', 'email', 'phone', 'company', 'enquiry', 'message'];

export function ContactForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ContactErrors>({});
  const [touched, setTouched] = useState<Partial<Record<ContactField, boolean>>>({});
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

  const update = (field: ContactField, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (touched[field]) setErrors((prev) => ({ ...prev, [field]: validateEnquiry(next)[field] }));
  };

  const onChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const target = event.target;
    // The message field grows with its content.
    if (target instanceof HTMLTextAreaElement) {
      target.style.height = 'auto';
      target.style.height = `${target.scrollHeight}px`;
    }
    update(target.name as ContactField, target.value);
  };

  const onBlur = (field: ContactField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateEnquiry(values)[field] }));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const found = validateEnquiry(values);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }
    setPending(true);
    setResult(null);
    const outcome = await submitEnquiry(values);
    setPending(false);
    setResult(outcome);
  };

  // Delivered: the form gives way to a short thank-you.
  if (result?.status === 'sent') {
    return (
      <div className={styles.thanks} role="status" tabIndex={-1} ref={(el) => el?.focus()}>
        <svg className={styles.check} viewBox="0 0 48 48" aria-hidden="true">
          <circle cx="24" cy="24" r="23" />
          <path d="M14 24.5l7 7 13-14" />
        </svg>
        <p className={styles.thanksTitle}>Thank you.</p>
        <p className={styles.thanksText}>Your enquiry has been sent.</p>
      </div>
    );
  }

  const describedBy = (field: ContactField) => (errors[field] ? `contact-${field}-error` : undefined);
  const fieldProps = (field: ContactField) => ({
    id: `contact-${field}`,
    name: field,
    value: values[field],
    onChange,
    onBlur: () => onBlur(field),
    'aria-invalid': errors[field] ? true : undefined,
    'aria-describedby': describedBy(field),
    className: styles.control,
  });
  const errorFor = (field: ContactField) =>
    errors[field] ? (
      <p id={`contact-${field}-error`} className={styles.error}>
        {errors[field]}
      </p>
    ) : null;
  const fieldClass = (field: ContactField, extra = '') =>
    [styles.field, errors[field] ? styles.invalid : '', extra].filter(Boolean).join(' ');

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={styles.form} aria-describedby="contact-required-note">
      <p id="contact-required-note" className={styles.requiredNote}>
        Fields marked <span aria-hidden="true">*</span>
        <span className="visually-hidden">with an asterisk</span> are required.
      </p>

      <div className={fieldClass('name')}>
        <label htmlFor="contact-name" className={styles.label}>
          Name <span aria-hidden="true">*</span>
        </label>
        <span className={styles.controlWrap}>
          <input type="text" autoComplete="name" required {...fieldProps('name')} />
          <span className={styles.bar} aria-hidden="true" />
        </span>
        {errorFor('name')}
      </div>

      <div className={fieldClass('email')}>
        <label htmlFor="contact-email" className={styles.label}>
          Email <span aria-hidden="true">*</span>
        </label>
        <span className={styles.controlWrap}>
          <input type="email" autoComplete="email" inputMode="email" required {...fieldProps('email')} />
          <span className={styles.bar} aria-hidden="true" />
        </span>
        {errorFor('email')}
      </div>

      <div className={fieldClass('phone')}>
        <label htmlFor="contact-phone" className={styles.label}>
          Phone
        </label>
        <span className={styles.controlWrap}>
          <input type="tel" autoComplete="tel" inputMode="tel" {...fieldProps('phone')} />
          <span className={styles.bar} aria-hidden="true" />
        </span>
        {errorFor('phone')}
      </div>

      <div className={fieldClass('company')}>
        <label htmlFor="contact-company" className={styles.label}>
          Company / Organisation
        </label>
        <span className={styles.controlWrap}>
          <input type="text" autoComplete="organization" {...fieldProps('company')} />
          <span className={styles.bar} aria-hidden="true" />
        </span>
        {errorFor('company')}
      </div>

      {/* Nature of enquiry: radio chips instead of a native select */}
      <fieldset
        className={`${styles.chipsField} ${styles.full}`}
        aria-invalid={errors.enquiry ? true : undefined}
        aria-describedby={describedBy('enquiry')}
      >
        <legend className={styles.label}>
          Nature of enquiry <span aria-hidden="true">*</span>
        </legend>
        <div className={styles.chips}>
          {enquiryTypes.map((type, i) => (
            <label key={type.value} className={styles.chip}>
              <input
                type="radio"
                name="enquiry"
                value={type.value}
                checked={values.enquiry === type.value}
                required={i === 0}
                onChange={() => {
                  setTouched((prev) => ({ ...prev, enquiry: true }));
                  update('enquiry', type.value);
                  setErrors((prev) => ({ ...prev, enquiry: undefined }));
                }}
                className={styles.chipInput}
              />
              <span>{type.label}</span>
            </label>
          ))}
        </div>
        {errorFor('enquiry')}
      </fieldset>

      <div className={fieldClass('message', styles.full)}>
        <label htmlFor="contact-message" className={styles.label}>
          Tell us about the site or opportunity
        </label>
        <span className={styles.controlWrap}>
          <textarea rows={3} {...fieldProps('message')} />
          <span className={styles.bar} aria-hidden="true" />
        </span>
        {errorFor('message')}
      </div>

      <div className={`${styles.full} ${styles.actions}`}>
        <button type="submit" className="btn btn--primary" disabled={pending} aria-disabled={pending}>
          {pending ? 'Sending…' : 'Start a Conversation'}
        </button>
        <div role="status" aria-live="polite" className={styles.status}>
          {result?.status === 'not-configured' && (
            <p className={styles.notice}>
              This form is not yet connected, so your enquiry has <strong>not</strong> been sent.{' '}
              <TBC>Form delivery to be connected</TBC>
            </p>
          )}
          {result?.status === 'error' && (
            <p className={styles.error} role="alert">
              {result.message}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
