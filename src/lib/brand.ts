/**
 * Single source of truth for product branding.
 * Rename `name` / `domain` here (e.g. Apex → Uni Centro) and the rest of the site follows.
 */
const name = "Apex";
const domain = "apex.training";

export const brand = {
  name,
  domain,
  legalName: `${name} Food Safety Training`,
  tagline: "Professional food safety training for kitchens that cannot afford a miss.",
  shortTagline: "Train teams that protect every plate.",
  description: `${name} delivers practical, standards-aligned food safety courses for restaurants, institutions, and growing food businesses. Learners buy online, train in a structured LMS, and leave with documented competency.`,
  email: `hello@${domain}`,
  phone: "(800) 555-0148",
  address: "1200 Market Street, Suite 400, Chicago, IL 60607",
  hours: "Monday–Friday, 8:00 a.m.–6:00 p.m. CT",
  demo: {
    password: "ApexDemo123!",
    adminEmail: `admin@${domain}`,
    learnerEmail: `learner@${domain}`,
    adminName: "Jordan Hale",
    learnerName: "Maya Chen",
  },
} as const;

export type Brand = typeof brand;
