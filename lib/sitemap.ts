import { getAllProjects, getAllArticles } from '@/lib/mdx';

export default function sitemap() {
  const baseUrl = 'https://aiden-portfolio.vercel.app';
  const projects = getAllProjects();
  const articles = getAllArticles();

  const staticPages = [
    { url: '', changefreq: 'monthly' as const, priority: 1 },
    { url: '/projects', changefreq: 'weekly' as const, priority: 0.9 },
    { url: '/writing', changefreq: 'weekly' as const, priority: 0.8 },
    { url: '/resume', changefreq: 'monthly' as const, priority: 0.7 },
    { url: '/contact', changefreq: 'monthly' as const, priority: 0.5 },
  ];

  const projectPages = projects.map((project) => ({
    url: `/projects/${project.slug}`,
    changefreq: 'monthly' as const,
    priority: 0.8,
  }));

  const articlePages = articles.map((article) => ({
    url: `/writing/${article.slug}`,
    changefreq: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...projectPages, ...articlePages].map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: new Date(),
    changeFrequency: page.changefreq,
    priority: page.priority,
  }));
}
