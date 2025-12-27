import { z } from 'zod';

export const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  metric: z.string().min(1, 'Metric is required'),
  tags: z.array(z.string()).default([]),
  summary: z.string().min(1, 'Summary is required'),
  background: z.string().min(1, 'Background is required'),
  solution: z.string().min(1, 'Solution is required'),
  decisions: z.array(z.string()).default([]),
  highlights: z.array(z.string()).default([]),
  results: z.string().min(1, 'Results are required'),
  retrospective: z.array(z.string()).default([]),
  codeUrl: z.string().url().optional().or(z.literal('')),
  demoUrl: z.string().url().optional().or(z.literal('')),
  content: z.string().default(''),
});

export type ProjectFormData = z.infer<typeof projectSchema>;

export const createProjectSchema = projectSchema.extend({
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
});

export type CreateProjectData = z.infer<typeof createProjectSchema>;

export const updateProjectSchema = projectSchema.partial().extend({
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  metric: z.string().min(1).optional(),
  summary: z.string().min(1).optional(),
  background: z.string().min(1).optional(),
  solution: z.string().min(1).optional(),
  results: z.string().min(1).optional(),
});

export type UpdateProjectData = z.infer<typeof updateProjectSchema>;
