import { simpleGit, SimpleGit, LogOptions } from 'simple-git';
import path from 'path';

const git: SimpleGit = simpleGit({ baseDir: process.cwd() });

export interface GitCommit {
  hash: string;
  date: Date;
  message: string;
  author: string;
}

export interface GitDiff {
  filePath: string;
  oldContent: string | null;
  newContent: string | null;
}

export async function getFileHistory(filePath: string, limit: number = 20): Promise<GitCommit[]> {
  try {
    const log = await git.log({ file: filePath, maxCount: limit });
    return log.all.map((commit) => ({
      hash: commit.hash,
      date: new Date(commit.date),
      message: commit.message,
      author: commit.author_name || '',
    }));
  } catch (error) {
    console.error(`Error getting history for ${filePath}:`, error);
    return [];
  }
}

export async function getFileAtCommit(filePath: string, commitHash: string): Promise<string> {
  try {
    const content = await git.show([`${commitHash}:${filePath}`]);
    return content;
  } catch (error) {
    console.error(`Error getting file at commit ${commitHash}:`, error);
    throw new Error(`Failed to retrieve file at commit ${commitHash}`);
  }
}

export async function commitChanges(message: string, filePaths?: string[]): Promise<string> {
  try {
    if (filePaths && filePaths.length > 0) {
      await git.add(filePaths);
    } else {
      await git.add('.');
    }

    const commitResult = await git.commit(message);
    return commitResult.commit || '';
  } catch (error) {
    console.error('Error committing changes:', error);
    throw new Error('Failed to commit changes');
  }
}

export async function rollbackFile(filePath: string, commitHash: string): Promise<void> {
  try {
    await git.checkout(commitHash, ['--', filePath]);
  } catch (error) {
    console.error(`Error rolling back ${filePath} to ${commitHash}:`, error);
    throw new Error(`Failed to rollback file to ${commitHash}`);
  }
}

export async function getFileDiff(filePath: string, commitHash: string): Promise<string> {
  try {
    const diff = await git.diff([commitHash, '--', filePath]);
    return diff;
  } catch (error) {
    console.error(`Error getting diff for ${filePath}:`, error);
    return '';
  }
}

export async function getCurrentCommit(): Promise<string> {
  try {
    const log = await git.log({ maxCount: 1 });
    return log.latest?.hash || '';
  } catch (error) {
    console.error('Error getting current commit:', error);
    return '';
  }
}

export async function isGitRepository(): Promise<boolean> {
  try {
    await git.status();
    return true;
  } catch {
    return false;
  }
}

export async function getStatus(): Promise<{
  modified: string[];
  staged: string[];
  untracked: string[];
}> {
  try {
    const status = await git.status();
    return {
      modified: status.modified,
      staged: status.staged,
      untracked: status.not_added,
    };
  } catch (error) {
    console.error('Error getting git status:', error);
    return { modified: [], staged: [], untracked: [] };
  }
}

export async function discardChanges(filePath: string): Promise<void> {
  try {
    await git.checkout(['--', filePath]);
  } catch (error) {
    console.error(`Error discarding changes for ${filePath}:`, error);
    throw new Error(`Failed to discard changes for ${filePath}`);
  }
}

const projectsDir = path.join(process.cwd(), 'content', 'projects');

export async function getProjectHistory(slug: string): Promise<GitCommit[]> {
  const filePath = path.join('content', 'projects', `${slug}.mdx`);
  return getFileHistory(filePath);
}

export async function getProjectAtCommit(slug: string, commitHash: string): Promise<string> {
  const filePath = path.join('content', 'projects', `${slug}.mdx`);
  return getFileAtCommit(filePath, commitHash);
}

export async function rollbackProject(slug: string, commitHash: string): Promise<void> {
  const filePath = path.join('content', 'projects', `${slug}.mdx`);
  await rollbackFile(filePath, commitHash);
}
