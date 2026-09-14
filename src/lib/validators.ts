import { z } from "zod";

export const signUpSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters."),
  email: z.email("Enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .regex(/[A-Za-z]/, "Password must include a letter.")
    .regex(/[0-9]/, "Password must include a number."),
});

export const signInSchema = z.object({
  email: z.email("Enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.email("Enter a valid email address."),
  topic: z.string().trim().min(2, "Choose a topic."),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
});

export const courseSchema = z.object({
  title: z.string().trim().min(3),
  slug: z
    .string()
    .trim()
    .min(3)
    .regex(/^[a-z0-9-]+$/, "Use lowercase letters, numbers, and hyphens."),
  subtitle: z.string().trim().min(8),
  description: z.string().trim().min(20),
  audience: z.string().trim().min(4),
  durationHours: z.coerce.number().int().min(1).max(80),
  level: z.string().trim().min(3),
  priceCents: z.coerce.number().int().min(0),
  accent: z.string().trim().min(4),
  learningOutcomes: z.string().trim().min(4),
  includes: z.string().trim().min(4),
  published: z.boolean().optional(),
  featured: z.boolean().optional(),
});
