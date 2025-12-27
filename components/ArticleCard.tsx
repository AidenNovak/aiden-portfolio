import Link from 'next/link';
import { Article } from '@/lib/mdx';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="border-l-2 border-gray-200 dark:border-gray-800 pl-4 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500 mb-1">
        <time dateTime={article.date}>{article.date}</time>
        <span>·</span>
        <span>{article.readingTime}</span>
      </div>

      <h3 className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2">
        <Link href={`/writing/${article.slug}`} className="hover:underline">
          {article.title}
        </Link>
      </h3>

      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
        {article.summary}
      </p>

      <Link
        href={`/writing/${article.slug}`}
        className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
      >
        Read more
      </Link>
    </article>
  );
}
