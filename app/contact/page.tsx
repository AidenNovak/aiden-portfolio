'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [copied, setCopied] = useState(false);

  const email = "2453204059@qq.com";
  const contactText = `Hi Aiden,

I came across your portfolio and would like to connect about [opportunity/topic].

Best,
[Your name]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(contactText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Get in Touch
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
          I&apos;m open to conversations about engineering roles, collaborations, or interesting problems.
        </p>
      </header>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Email
        </h2>
        <a
          href={`mailto:${email}`}
          className="text-xl text-blue-600 dark:text-blue-400 hover:underline"
        >
          {email}
        </a>
      </section>

      <section className="mb-12">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Elsewhere
        </h2>
        <ul className="space-y-2">
          <li>
            <a
              href="https://github.com/AidenNovak"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              github.com/AidenNovak →
            </a>
          </li>
        </ul>
      </section>

      <section className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
          Quick Copy Template
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Feel free to use this template when reaching out:
        </p>
        <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap bg-white dark:bg-black p-4 rounded border border-gray-200 dark:border-gray-800">
          {contactText}
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className="mt-4 text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
        >
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </button>
      </section>
    </div>
  );
}
