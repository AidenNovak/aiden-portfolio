import Link from 'next/link';
import { Project } from '@/lib/mdx';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <article className="border border-gray-200 dark:border-gray-800 rounded-lg p-6 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex justify-between items-start gap-4 mb-3">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {project.title}
        </h3>
        {project.metric && (
          <span className="text-xs font-medium text-green-600 dark:text-green-400 text-right flex-shrink-0 max-w-[120px]">
            {project.metric}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 text-sm">
        <Link
          href={`/projects/${project.slug}`}
          className="font-medium text-gray-900 dark:text-gray-100 hover:underline"
        >
          Case study
        </Link>
        {(project.codeUrl || project.demoUrl) && (
          <span className="text-gray-300 dark:text-gray-700">·</span>
        )}
        {project.codeUrl && (
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            Code
          </a>
        )}
        {project.demoUrl && (
          <>
            {project.codeUrl && <span className="text-gray-300 dark:text-gray-700">·</span>}
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              Demo
            </a>
          </>
        )}
      </div>
    </article>
  );
}
