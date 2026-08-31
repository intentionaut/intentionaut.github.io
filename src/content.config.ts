import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    // A full external URL, or a root-relative path for a talk that links to a
    // page on this site (e.g. a write-up under /writing).
    url: z.union([z.string().url(), z.string().startsWith('/')]).optional(),
    description: z.string().optional(),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    seoTitle: z.string().optional(),
  }),
});

const essays = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    themes: z.array(z.string()).default([]),
    source: z.string().default('Blossom'),
    originalUrl: z.string().url().optional(),
  }),
});

const drafts = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/drafts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    originalTitle: z.string(),
    originalUrl: z.string(),
  }),
});

const stubs = defineCollection({
  loader: glob({ pattern: ['**/*.md', '!**/_*.md', '!**/media/**'], base: './src/content/stubs' }),
  schema: z.object({
    title: z.string(),
    source: z.string().optional(),
    status: z.enum(['stub', 'draft', 'done']).default('stub'),
  }),
});

const projects = defineCollection({
    loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string().url().optional(),
    linkLabel: z.string().optional(),
    ctaLabel: z.string().optional(),
    // Where the source lives, when a project has a site and a repo. `url` is
    // the project's own front door; this is the code behind it.
    repoUrl: z.string().url().optional(),
    repoLabel: z.string().optional(),
    role: z.string(),
    timeline: z.string().optional(),
    status: z.string().optional(),
    date: z.coerce.date().optional(),
    order: z.number().optional(),
    categories: z.array(z.string()).default([]),
  }),
});

export const collections = { talks, pages, projects, essays, drafts, stubs };
