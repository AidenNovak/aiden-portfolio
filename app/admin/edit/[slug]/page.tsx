import { Suspense } from 'react';
import { EditProjectClient } from './EditProjectClient';

// Admin pages are only available in development mode
export const dynamic = 'force-static';
export const revalidate = false;

export function generateStaticParams() {
  return [];
}

export default function EditProjectPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-gray-500 dark:text-gray-400">Loading...</div></div>}>
      <EditProjectClient />
    </Suspense>
  );
}
