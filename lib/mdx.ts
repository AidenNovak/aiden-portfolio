import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content');

export interface Project {
  slug: string;
  title: string;
  description: string;
  metric: string;
  tags: string[];
  codeUrl?: string;
  demoUrl?: string;
  content: string;
  summary: string;
  background: string;
  solution: string;
  decisions: string[];
  highlights: string[];
  results: string;
  retrospective: string[];
}

export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readingTime: string;
  content: string;
}

export function getAllProjects(): Project[] {
  const projectsDir = path.join(contentDirectory, 'projects');
  if (!fs.existsSync(projectsDir)) return [];

  const fileNames = fs.readdirSync(projectsDir);
  const allProjects = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const filePath = path.join(projectsDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title || '',
        description: data.description || '',
        metric: data.metric || 'TODO: Add metric',
        tags: data.tags || [],
        codeUrl: data.codeUrl,
        demoUrl: data.demoUrl,
        content,
        summary: data.summary || '',
        background: data.background || '',
        solution: data.solution || '',
        decisions: data.decisions || [],
        highlights: data.highlights || [],
        results: data.results || 'TODO: Add results',
        retrospective: data.retrospective || [],
      };
    });

  return allProjects.sort((a, b) => a.slug.localeCompare(b.slug));
}

export function getProjectBySlug(slug: string): Project | undefined {
  const allProjects = getAllProjects();
  return allProjects.find((p) => p.slug === slug);
}

export function getAllArticles(): Article[] {
  const articlesDir = path.join(contentDirectory, 'writing');
  if (!fs.existsSync(articlesDir)) return [];

  const fileNames = fs.readdirSync(articlesDir);
  const allArticles = fileNames
    .filter((name) => name.endsWith('.mdx'))
    .map((fileName) => {
      const filePath = path.join(articlesDir, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf-8');
      const { data, content } = matter(fileContents);

      return {
        slug: fileName.replace(/\.mdx$/, ''),
        title: data.title || '',
        summary: data.summary || '',
        date: data.date || '',
        readingTime: readingTime(content).text,
        content,
      };
    });

  return allArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getArticleBySlug(slug: string): Article | undefined {
  const allArticles = getAllArticles();
  return allArticles.find((a) => a.slug === slug);
}
