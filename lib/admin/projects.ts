import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Project, getAllProjects } from '../mdx';
import type { ProjectFormData, CreateProjectData } from './validation';

const projectsDir = path.join(process.cwd(), 'content', 'projects');

export interface ProjectWithMeta extends Project {
  lastModified?: Date;
  gitStatus?: 'modified' | 'staged' | 'untracked';
}

export function listProjects(): ProjectWithMeta[] {
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  return getAllProjects();
}

export function projectExists(slug: string): boolean {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  return fs.existsSync(filePath);
}

export function slugExists(slug: string): boolean {
  return projectExists(slug);
}

export function readProject(slug: string): string {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Project "${slug}" not found`);
  }
  return fs.readFileSync(filePath, 'utf-8');
}

export function writeProject(slug: string, data: CreateProjectData): void {
  if (!fs.existsSync(projectsDir)) {
    fs.mkdirSync(projectsDir, { recursive: true });
  }

  const filePath = path.join(projectsDir, `${slug}.mdx`);

  const frontmatter: Record<string, unknown> = {
    title: data.title,
    description: data.description,
    metric: data.metric,
    tags: data.tags,
    summary: data.summary,
    background: data.background,
    solution: data.solution,
    decisions: data.decisions,
    highlights: data.highlights,
    results: data.results,
    retrospective: data.retrospective,
  };

  // Add optional URLs only if provided
  if (data.codeUrl) frontmatter.codeUrl = data.codeUrl;
  if (data.demoUrl) frontmatter.demoUrl = data.demoUrl;

  const { content } = matter(data.content || '');
  const mdxContent = matter.stringify(content, frontmatter);

  fs.writeFileSync(filePath, mdxContent, 'utf-8');
}

export function updateProject(slug: string, data: ProjectFormData): void {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Project "${slug}" not found`);
  }

  const existingContent = fs.readFileSync(filePath, 'utf-8');
  const { data: existingData, content: existingBody } = matter(existingContent);

  const frontmatter: Record<string, unknown> = {
    ...existingData,
    title: data.title,
    description: data.description,
    metric: data.metric,
    tags: data.tags,
    summary: data.summary,
    background: data.background,
    solution: data.solution,
    decisions: data.decisions,
    highlights: data.highlights,
    results: data.results,
    retrospective: data.retrospective,
  };

  // Handle optional URLs - remove if empty string
  if (data.codeUrl && data.codeUrl.trim()) {
    frontmatter.codeUrl = data.codeUrl;
  } else {
    delete frontmatter.codeUrl;
  }

  if (data.demoUrl && data.demoUrl.trim()) {
    frontmatter.demoUrl = data.demoUrl;
  } else {
    delete frontmatter.demoUrl;
  }

  const newBody = data.content || existingBody;
  const mdxContent = matter.stringify(newBody, frontmatter);

  fs.writeFileSync(filePath, mdxContent, 'utf-8');
}

export function deleteProject(slug: string): void {
  const filePath = path.join(projectsDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    throw new Error(`Project "${slug}" not found`);
  }
  fs.unlinkSync(filePath);
}

export function parseProjectFromFile(slug: string): ProjectFormData {
  const fileContent = readProject(slug);
  const { data } = matter(fileContent);

  return {
    title: data.title || '',
    description: data.description || '',
    metric: data.metric || '',
    tags: data.tags || [],
    summary: data.summary || '',
    background: data.background || '',
    solution: data.solution || '',
    decisions: data.decisions || [],
    highlights: data.highlights || [],
    results: data.results || '',
    retrospective: data.retrospective || [],
    codeUrl: data.codeUrl || '',
    demoUrl: data.demoUrl || '',
    content: matter(fileContent).content || '',
  };
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9-]+$/.test(slug);
}
