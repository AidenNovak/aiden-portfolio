import { ProjectForm } from '@/components/admin/ProjectForm';
import Link from 'next/link';

// Admin pages are only available in development mode
export const dynamic = 'force-static';

export default function NewProjectPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-6">
        <Link
          href="/admin"
          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
        >
          ← Back to Projects
        </Link>
      </div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">New Project</h2>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Create a new project with structured case study format.
        </p>
      </div>
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
        <ProjectForm />
      </div>
    </div>
  );
}
