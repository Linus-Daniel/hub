import { z } from 'zod';

// User validation schemas
export const userQuerySchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val) : 1),
  limit: z.string().optional().transform((val) => val ? Math.min(parseInt(val) || 10, 100) : 10),
  search: z.string().optional().transform((val) => val?.trim().slice(0, 100)),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
});

export const userUpdateSchema = z.object({
  fullName: z.string().min(1).max(100).optional(),
  email: z.string().email().optional(),
  phone: z.string().max(20).optional(),
  institution: z.string().max(200).optional(),
  major: z.string().max(100).optional(),
  status: z.enum(['pending', 'approved', 'rejected']).optional(),
  role: z.enum(['student', 'alumni', 'recruiter']).optional(),
});

export const projectQuerySchema = z.object({
  page: z.string().optional().transform((val) => val ? parseInt(val) : 1),
  limit: z.string().optional().transform((val) => val ? Math.min(parseInt(val) || 10, 50) : 10),
  search: z.string().optional().transform((val) => val?.trim().slice(0, 100)),
  userId: z.string().optional(),
});

// Sanitize function
export function sanitizeInput<T>(input: T): T {
  if (typeof input === 'string') {
    return input.trim().replace(/[<>]/g, '') as T;
  }
  if (Array.isArray(input)) {
    return input.map(item => sanitizeInput(item)) as T;
  }
  if (typeof input === 'object' && input !== null) {
    const sanitized = {} as T;
    for (const [key, value] of Object.entries(input)) {
      (sanitized as any)[key] = sanitizeInput(value);
    }
    return sanitized;
  }
  return input;
}