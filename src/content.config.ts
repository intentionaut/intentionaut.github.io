import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const talks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/talks' }),
  schema: z.object({
    title: z.string(),
    event: z.string(),
    date: z.coerce.date(),
    location: z.string().optional(),
    url: z.string().url().optional(),
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

const projects = defineCollection({
    loader: glob({ pattern: ['**/*.md', '!**/_*.md'], base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    url: z.string().url().optional(),
    linkLabel: z.string().optional(),
    ctaLabel: z.string().optional(),
    role: z.string(),
    timeline: z.string().optional(),
    status: z.string().optional(),
    date: z.coerce.date().optional(),
  }),
});

export const collections = { talks, pages, projects, essays };
