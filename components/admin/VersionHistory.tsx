'use client';

import { useState } from 'react';
import { GitCommit } from '@/lib/admin/git';

interface VersionHistoryProps {
  slug: string;
  history: GitCommit[];
  onRollback: (sha: string) => void;
}

export function VersionHistory({ slug, history, onRollback }: VersionHistoryProps) {
  const [expanded, setExpanded] = useState(false);
  const [rollingBack, setRollingBack] = useState<string | null>(null);

  const handleRollback = async (sha: string) => {
    if (!confirm(`Are you sure you want to rollback to commit ${sha.substring(0, 7)}?`)) {
      return;
    }
    setRollingBack(sha);
    try {
      await onRollback(sha);
      alert('Rollback successful!');
    } catch (error) {
      alert(`Rollback failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setRollingBack(null);
    }
  };

  return (
    <div className="border border-gray-200 dark:border-gray-800 rounded-lg">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-900/50 rounded-lg transition-colors"
      >
        <span className="font-medium text-gray-900 dark:text-gray-100">Version History</span>
        <svg
          className={`w-5 h-5 text-gray-500 dark:text-gray-400 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <div className="border-t border-gray-200 dark:border-gray-800 max-h-64 overflow-y-auto">
          {history.length === 0 ? (
            <div className="p-4 text-sm text-gray-500 dark:text-gray-400 text-center">
              No history available
            </div>
          ) : (
            <ul className="divide-y divide-gray-100 dark:divide-gray-900">
              {history.map((commit) => (
                <li key={commit.hash} className="p-3 hover:bg-gray-50 dark:hover:bg-gray-900/30">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {commit.message}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {commit.author} · {commit.date.toLocaleDateString()} {commit.date.toLocaleTimeString()}
                      </div>
                      <div className="text-xs text-gray-400 dark:text-gray-500 font-mono mt-1">
                        {commit.hash}
                      </div>
                    </div>
                    <button
                      onClick={() => handleRollback(commit.hash)}
                      disabled={rollingBack === commit.hash}
                      className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50 transition-colors"
                    >
                      {rollingBack === commit.hash ? 'Rolling back...' : 'Rollback'}
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
