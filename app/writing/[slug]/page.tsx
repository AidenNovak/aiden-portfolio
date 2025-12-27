import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllArticles, getArticleBySlug } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';

const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4 text-gray-900 dark:text-gray-100">
      {children}
    </h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 id="slug" className="text-2xl font-semibold tracking-tight mt-8 mb-4 text-gray-900 dark:text-gray-100 scroll-mt-20">
      {children}
    </h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3 text-gray-900 dark:text-gray-100">
      {children}
    </h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => (
    <p className="my-4 leading-7 text-gray-600 dark:text-gray-400">
      {children}
    </p>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="my-4 ml-6 list-disc text-gray-600 dark:text-gray-400">
      {children}
    </ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="my-4 ml-6 list-decimal text-gray-600 dark:text-gray-400">
      {children}
    </ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-1">{children}</li>
  ),
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
      {children}
    </a>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-4 text-sm">
      {children}
    </pre>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">
      {children}
    </code>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4 text-gray-600 dark:text-gray-400">
      {children}
    </blockquote>
  ),
};

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  return {
    title: `${article.title} - Aiden Novak`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const allArticles = getAllArticles();
  const currentIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;
  const nextArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href="/writing" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              Writing
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-gray-900 dark:text-gray-100">{article.title}</li>
        </ol>
      </nav>

      {/* Article Header */}
      <header className="mb-12 pb-8 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-500 mb-4">
          <time dateTime={article.date}>{article.date}</time>
          <span>·</span>
          <span>{article.readingTime}</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          {article.title}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          {article.summary}
        </p>
      </header>

      {/* Article Content */}
      <article className="prose prose-gray dark:prose-invert max-w-none mb-12">
        <MDXRemote source={article.content} components={mdxComponents} />
      </article>

      {/* Navigation */}
      <nav className="flex justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-800">
        {prevArticle ? (
          <Link
            href={`/writing/${prevArticle.slug}`}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            ← {prevArticle.title}
          </Link>
        ) : (
          <span />
        )}
        {nextArticle ? (
          <Link
            href={`/writing/${nextArticle.slug}`}
            className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            {nextArticle.title} →
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
