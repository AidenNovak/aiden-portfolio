'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ProjectForm } from '@/components/admin/ProjectForm';
import { VersionHistory } from '@/components/admin/VersionHistory';
import { type GitCommit } from '@/lib/admin/git';
import { type ProjectFormData } from '@/lib/admin/validation';
import Link from 'next/link';

export function EditProjectClient() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [formData, setFormData] = useState<ProjectFormData | null>(null);
  const [history, setHistory] = useState<GitCommit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch project data
        const projectRes = await fetch(`/api/admin-api/projects/${slug}`);
        const projectResult = await projectRes.json();

        if (!projectResult.success) {
          throw new Error(projectResult.error || 'Project not found');
        }

        setFormData(projectResult.data);

        // Fetch history using query parameter
        const historyRes = await fetch(`/api/admin-api/projects/${slug}?history=true`);
        const historyResult = await historyRes.json();

        if (historyResult.success) {
          setHistory(historyResult.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load project');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  const handleRollback = async (sha: string) => {
    try {
      const response = await fetch(`/api/admin-api/projects/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rollback: true, commit: sha }),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Rollback failed');
      }

      // Refresh data
      setFormData(result.data.frontmatter);
      router.refresh();
    } catch (err) {
      throw err;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500 dark:text-gray-400">Loading...</div>
      </div>
    );
  }

  if (error || !formData) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 dark:text-red-400">{error || 'Project not found'}</p>
        <Link href="/admin" className="text-blue-600 dark:text-blue-400 hover:underline">
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <div className="mb-6">
          <Link
            href="/admin"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← Back to Projects
          </Link>
        </div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Edit Project</h2>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Slug: {slug}</p>
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6">
          <ProjectForm slug={slug} initialData={formData} isEditing />
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Link
              href={`/projects/${slug}`}
              target="_blank"
              className="block px-3 py-2 text-sm text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
            >
              View Live Page →
            </Link>
            <Link
              href={`https://github.com/aidennovak/ising-model/blob/main/content/projects/${slug}.mdx`}
              target="_blank"
              className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded"
            >
              View on GitHub →
            </Link>
          </div>
        </div>
        <VersionHistory slug={slug} history={history} onRollback={handleRollback} />
      </div>
    </div>
  );
}
