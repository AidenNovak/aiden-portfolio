import { ProjectTable } from '@/components/admin/ProjectTable';
import { getAllProjects } from '@/lib/mdx';
import Link from 'next/link';

// Admin pages are only available in development mode
export const dynamic = 'force-static';

export default function AdminPage() {
  const projects = getAllProjects();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Projects</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            {projects.length} {projects.length === 1 ? 'project' : 'projects'}
          </p>
        </div>
        <Link
          href="/admin/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          New Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No projects yet.</p>
          <Link
            href="/admin/new"
            className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline"
          >
            Create your first project →
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
          <ProjectTable projects={projects} />
        </div>
      )}
    </div>
  );
}
