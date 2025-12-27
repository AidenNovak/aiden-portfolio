import { getAllProjects } from '@/lib/mdx';
import { ProjectCard } from '@/components/ProjectCard';

export const metadata = {
  title: 'Projects - Aiden Novak',
  description: 'A selection of projects I have built, with detailed case studies.',
};

export default function ProjectsPage() {
  const allProjects = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Projects
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Each project below includes a detailed case study covering the problem, approach,
          key decisions, and what I would do differently.
        </p>
      </header>

      {allProjects.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-500 italic">
          No projects yet. Check back soon or see the{' '}
          <a href="https://github.com/AidenNovak" className="underline">GitHub</a> for work in progress.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {allProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
