export type HeaderTone = 'light' | 'dark';

export interface NavItem {
  href: string;
  label: string;
  /** Text colour of the transparent header over this page's hero. */
  headerTone: HeaderTone;
}

export const navItems: NavItem[] = [
  { href: '/', label: 'Home', headerTone: 'light' },
  { href: '/about', label: 'About', headerTone: 'dark' },
  { href: '/developments', label: 'Developments', headerTone: 'dark' },
  { href: '/expertise', label: 'Expertise', headerTone: 'dark' },
  { href: '/approach', label: 'Approach', headerTone: 'light' },
  { href: '/contact', label: 'Contact', headerTone: 'dark' },
];

export const headerCta = { href: '/contact', label: 'Discuss a Development' };

export function headerToneFor(pathname: string): HeaderTone {
  return navItems.find((item) => item.href === pathname)?.headerTone ?? 'dark';
}
