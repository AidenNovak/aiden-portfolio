import { MDXComponents as MDXComponentsType } from 'mdx/types';

export function useMDXComponents(components: MDXComponentsType): MDXComponentsType {
  return {
    h1: ({ children }) => <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{children}</h1>,
    h2: ({ children }) => <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-4">{children}</h2>,
    h3: ({ children }) => <h3 className="text-xl font-semibold tracking-tight mt-6 mb-3">{children}</h3>,
    p: ({ children }) => <p className="my-4 leading-7">{children}</p>,
    a: ({ href, children }) => (
      <a href={href} className="text-blue-600 dark:text-blue-400 hover:underline">
        {children}
      </a>
    ),
    ul: ({ children }) => <ul className="my-4 ml-6 list-disc">{children}</ul>,
    ol: ({ children }) => <ol className="my-4 ml-6 list-decimal">{children}</ol>,
    li: ({ children }) => <li className="my-1">{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    pre: ({ children }) => (
      <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-lg overflow-x-auto my-4">
        {children}
      </pre>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 dark:bg-gray-900 px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    ...components,
  };
}
