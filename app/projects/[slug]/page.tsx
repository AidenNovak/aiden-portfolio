import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllProjects, getProjectBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4 text-gray-900 dark:text-gray-100">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3 text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-7 text-gray-600 dark:text-gray-400">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc text-gray-600 dark:text-gray-400">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal text-gray-600 dark:text-gray-400">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-1">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
      {children}
    </a>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
      {children}
    </blockquote>
  ),
};

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: `${project.title} - Aiden Novak`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = getAllProjects();
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/projects" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Projects
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 dark:text-gray-100">{project.title}</li>
        </ol>
      </nav>

      {/* Header */}
      <header className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
          {project.summary}
        </p>
        {project.metric && !project.metric.includes('TODO') && (
          <div className="text-sm font-medium text-green-600 dark:text-green-400">
            {project.metric}
          </div>
        )}
      </header>

      {/* Case Study Content */}
      <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
        {/* One-line summary */}
        <section className="mb-10 p-5 bg-gray-50 dark:bg-gray-900 rounded-lg">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-2">
            In one sentence
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            I {project.summary}
          </p>
        </section>

        {/* Background & Constraints */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Background & Constraints
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {project.background}
          </p>
        </section>

        {/* Solution Overview */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Solution Overview
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {project.solution}
          </p>
        </section>

        {/* Key Decisions */}
        {project.decisions.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Key Decisions
            </h2>
            <ul className="space-y-3">
              {project.decisions.map((decision, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-400">
                  {decision}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Implementation Highlights */}
        {project.highlights.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Implementation Highlights
            </h2>
            <ul className="space-y-3">
              {project.highlights.map((highlight, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-400">
                  {highlight}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Results & Verification */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Results & Verification
          </h2>
          <p className={`text-gray-600 dark:text-gray-400 ${project.results.includes('TODO') ? 'italic' : ''}`}>
            {project.results}
          </p>
        </section>

        {/* Retrospective */}
        {project.retrospective.length > 0 && (
          <section className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Retrospective: What I would do differently
            </h2>
            <ul className="space-y-3">
              {project.retrospective.map((item, i) => (
                <li key={i} className="text-gray-600 dark:text-gray-400">
                  {item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Additional MDX content */}
        {project.content && (
          <section className="mb-10">
            <MDXRemote source={project.content} components={mdxComponents} />
          </section>
        )}
      </article>

      {/* Links */}
      <section className="mb-12 p-5 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-100 mb-3">
          Links
        </h2>
        <div className="flex flex-wrap gap-4">
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
            >
              View Code →
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
            >
              Live Demo →
            </a>
          )}
          {(!project.codeUrl || !project.demoUrl) && (
            <span className="text-sm text-gray-500 dark:text-gray-500 italic">
              TODO: Add links
            </span>
          )}
        </div>
      </section>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
        {prevProject ? (
          <Link
            href={`/projects/${prevProject.slug}`}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← {prevProject.title}
          </Link>
        ) : (
          <span />
        )}
        {nextProject ? (
          <Link
            href={`/projects/${nextProject.slug}`}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {nextProject.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
