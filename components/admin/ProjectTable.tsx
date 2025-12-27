'use client';

import Link from 'next/link';
import { Project } from '@/lib/mdx';

interface ProjectTableProps {
  projects: Project[];
}

export function ProjectTable({ projects }: ProjectTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200 dark:border-gray-800">
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Title
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Metric
            </th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Tags
            </th>
            <th className="text-right py-3 px-4 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.slug} className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900/50">
              <td className="py-3 px-4">
                <div className="font-medium text-gray-900 dark:text-gray-100">{project.title}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{project.slug}</div>
              </td>
              <td className="py-3 px-4">
                <span className="text-sm text-green-600 dark:text-green-400">{project.metric}</span>
              </td>
              <td className="py-3 px-4">
                <div className="flex flex-wrap gap-1">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="py-3 px-4 text-right">
                <Link
                  href={`/admin/edit/${project.slug}`}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline mr-3"
                >
                  Edit
                </Link>
                <Link
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:underline"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
