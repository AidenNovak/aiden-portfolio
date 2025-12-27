import { Suspense } from 'react';
import { LoginClient } from './LoginClient';

// Admin pages are only available in development mode
export const dynamic = 'force-static';

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-12"><div className="text-gray-500 dark:text-gray-400">Loading...</div></div>}>
      <LoginClient />
    </Suspense>
  );
}
