import Link from 'next/link';
import { getAllProjects } from '@/lib/mdx';
import { ProjectCard } from '@/components/ProjectCard';

export default function HomePage() {
  const allProjects = getAllProjects();
  const featuredProjects = allProjects.slice(0, 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-gray-200 dark:border-gray-800">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-gray-100 mb-6">
          Aiden Novak
        </h1>
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          Physics major at Nankai University. Engineering-minded builder who turns messy problems into measurable systems.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-10 max-w-xl">
          物理专业背景，偏工程的开发者：把复杂问题做成可运行、可测量、可解释的系统。
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-gray-900 dark:bg-gray-100 rounded-md hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            View Projects
          </Link>
          <a
            href="/resume.pdf" // TODO: Add actual resume PDF
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
          >
            Download Resume
          </a>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Featured Work
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
        {allProjects.length > 3 && (
          <Link
            href="/projects"
            className="inline-block mt-8 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            View all projects →
          </Link>
        )}
      </section>

      {/* Proof Section */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          Proof
        </h2>

        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-4 uppercase tracking-wide">
            Skills I can demonstrate
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              'Numerical Computing',
              'Data Analysis',
              'Python',
              'TypeScript',
              'Machine Learning',
              'Simulation',
              'Linux',
              'Git',
            ].map((skill) => (
              <span
                key={skill}
                className="text-sm px-3 py-1.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-3">
            Each skill is evidenced in my projects below.
          </p>
        </div>

        <div className="grid gap-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
              Background
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              B.S. Physics, Nankai University
              <br />
              Focus on computational physics and numerical methods
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
              Code
            </h3>
            <a
              href="https://github.com/AidenNovak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              github.com/AidenNovak →
            </a>
          </div>
        </div>
      </section>

      {/* Working Style Section */}
      <section className="py-16">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
          How I Work
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <ol className="space-y-4 text-gray-600 dark:text-gray-400">
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Define the problem first.</strong>
              {' '}Before writing code, I specify what success looks like and how I will measure it.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Build the smallest thing that works.</strong>
              {' '}I ship a minimal solution quickly, then iterate based on real feedback.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Document decisions, not just code.</strong>
              {' '}I write down why I chose one approach over another so future-me (and others) can understand.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Test against reality.</strong>
              {' '}Physics taught me that models are useless until validated against data.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Clean up before moving on.</strong>
              {' '}I refactor, delete dead code, and update docs before starting the next feature.
            </li>
            <li>
              <strong className="text-gray-900 dark:text-gray-100">Learn from failures.</strong>
              {' '}When things break, I investigate root cause and document what went wrong.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
