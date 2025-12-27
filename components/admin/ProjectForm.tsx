'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FormInput } from './FormInput';
import { ArrayInput } from './ArrayInput';
import type { ProjectFormData } from '@/lib/admin/validation';

interface ProjectFormProps {
  slug?: string;
  initialData?: Partial<ProjectFormData>;
  isEditing?: boolean;
}

export function ProjectForm({ slug, initialData, isEditing = false }: ProjectFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [formData, setFormData] = useState<ProjectFormData>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    metric: initialData?.metric || '',
    tags: initialData?.tags || [],
    summary: initialData?.summary || '',
    background: initialData?.background || '',
    solution: initialData?.solution || '',
    decisions: initialData?.decisions || [],
    highlights: initialData?.highlights || [],
    results: initialData?.results || '',
    retrospective: initialData?.retrospective || [],
    codeUrl: initialData?.codeUrl || '',
    demoUrl: initialData?.demoUrl || '',
    content: initialData?.content || '',
  });

  const updateField = (field: keyof ProjectFormData, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const url = isEditing
        ? `/api/admin-api/projects/${slug}`
        : '/api/admin-api/projects';

      const payload = isEditing
        ? formData
        : { ...formData, slug: slug || generateSlugFromTitle(formData.title) };

      const response = await fetch(url, {
        method: isEditing ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Operation failed');
      }

      router.push('/admin');
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateSlugFromTitle = (title: string) => {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Title"
          name="title"
          value={formData.title}
          onChange={(v) => updateField('title', v)}
          placeholder="Project title"
          required
        />
        <FormInput
          label="Metric"
          name="metric"
          value={formData.metric}
          onChange={(v) => updateField('metric', v)}
          placeholder="e.g., 87× faster than baseline"
          required
        />
      </div>

      <FormInput
        label="Description"
        name="description"
        type="textarea"
        value={formData.description}
        onChange={(v) => updateField('description', v)}
        placeholder="Short description for the project card"
        required
      />

      <ArrayInput
        label="Tags"
        value={formData.tags}
        onChange={(v) => updateField('tags', v)}
        placeholder="Add a tag (e.g., Python, React)"
      />

      <FormInput
        label="Summary"
        name="summary"
        value={formData.summary}
        onChange={(v) => updateField('summary', v)}
        placeholder="I [verb] [what] [result]..."
        required
      />

      <FormInput
        label="Background"
        name="background"
        type="textarea"
        value={formData.background}
        onChange={(v) => updateField('background', v)}
        placeholder="Problem context and constraints"
        required
      />

      <FormInput
        label="Solution"
        name="solution"
        type="textarea"
        value={formData.solution}
        onChange={(v) => updateField('solution', v)}
        placeholder="High-level solution approach"
        required
      />

      <ArrayInput
        label="Key Decisions"
        value={formData.decisions}
        onChange={(v) => updateField('decisions', v)}
        placeholder="Add a technical decision"
      />

      <ArrayInput
        label="Implementation Highlights"
        value={formData.highlights}
        onChange={(v) => updateField('highlights', v)}
        placeholder="Add a highlight"
      />

      <FormInput
        label="Results & Verification"
        name="results"
        type="textarea"
        value={formData.results}
        onChange={(v) => updateField('results', v)}
        placeholder="Measured results with methodology..."
        required
      />

      <ArrayInput
        label="Retrospective: What I'd do differently"
        value={formData.retrospective}
        onChange={(v) => updateField('retrospective', v)}
        placeholder="Add a retrospective point"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Code URL"
          name="codeUrl"
          type="url"
          value={formData.codeUrl || ''}
          onChange={(v) => updateField('codeUrl', v)}
          placeholder="https://github.com/user/repo"
        />
        <FormInput
          label="Demo URL"
          name="demoUrl"
          type="url"
          value={formData.demoUrl || ''}
          onChange={(v) => updateField('demoUrl', v)}
          placeholder="https://demo.example.com"
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Additional Content (MDX)
          </label>
          <button
            type="button"
            onClick={() => setPreviewOpen(!previewOpen)}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            {previewOpen ? 'Hide' : 'Show'} preview
          </button>
        </div>
        <textarea
          value={formData.content}
          onChange={(e) => updateField('content', e.target.value)}
          placeholder="## Additional sections in MDX format..."
          rows={10}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
        />
        {previewOpen && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 prose dark:prose-invert max-w-none">
            <p className="text-sm text-gray-500 dark:text-gray-400 italic">
              Preview: {formData.content ? 'content below' : 'no content'}
            </p>
            {formData.content && <div dangerouslySetInnerHTML={{ __html: formData.content }} />}
          </div>
        )}
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-6 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {isSubmitting ? 'Saving...' : isEditing ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  );
}
