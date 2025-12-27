'use client';

import { ReactNode } from 'react';

export function MDXContent({ children }: { children: ReactNode }) {
  return (
    <article className="prose prose-gray dark:prose-invert max-w-none">
      {children}
    </article>
  );
}
