import Link from 'next/link';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 mt-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {currentYear} Aiden Novak
          </p>
          <ul className="flex items-center gap-6">
            <li>
              <a
                href="https://github.com/AidenNovak"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:2453204059@qq.com"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
