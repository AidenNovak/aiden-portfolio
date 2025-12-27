import { getAllArticles } from '@/lib/mdx';
import { ArticleCard } from '@/components/ArticleCard';

export const metadata = {
  title: 'Writing - Aiden Novak',
  description: 'Notes on debugging, design tradeoffs, and engineering practices.',
};

export default function WritingPage() {
  const allArticles = getAllArticles();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Writing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          Notes on debugging, design tradeoffs, and engineering practices.
        </p>
      </header>

      {allArticles.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-500 italic">
          No articles yet. I write when I have something substantive to share.
        </p>
      ) : (
        <div className="space-y-8">
          {allArticles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </div>
  );
}
