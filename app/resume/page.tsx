import Link from 'next/link';
import { getAllProjects } from '@/lib/mdx';

export const metadata = {
  title: 'Resume - Aiden Novak',
  description: 'Resume and work experience of Aiden Novak.',
};

export default function ResumePage() {
  const allProjects = getAllProjects();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <header className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Aiden Novak
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Nankai University · Physics Major · China
          </p>
        </div>
        <a
          href="/resume.pdf" // TODO: Add actual resume PDF
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
        >
          Download PDF
        </a>
      </header>

      {/* Summary */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Summary
        </h2>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Physics major at Nankai University with a focus on computational physics and numerical methods.
          Engineering-minded builder who turns messy problems into measurable systems.
          Interested in software engineering, machine learning, and data engineering roles.
        </p>
      </section>

      {/* Skills */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Skills
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
          (All evidenced in projects below)
        </p>
        <div className="grid sm:grid-cols-2 gap-6 text-gray-600 dark:text-gray-400">
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Languages</h3>
            <p>Python, TypeScript, JavaScript, C++, MATLAB</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Tools & Frameworks</h3>
            <p>Git, Linux, NumPy, Pandas, PyTorch, Next.js, React</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Domains</h3>
            <p>Numerical Computing, Data Analysis, Machine Learning, Simulation</p>
          </div>
          <div>
            <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-2">Practices</h3>
            <p>Testing, Documentation, Code Review, CI/CD basics</p>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Projects
        </h2>
        <div className="space-y-6">
          {allProjects.map((project) => (
            <div key={project.slug} className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
              <div className="flex items-start justify-between gap-4 mb-1">
                <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                  <Link href={`/projects/${project.slug}`} className="hover:underline">
                    {project.title}
                  </Link>
                </h3>
                {project.metric && !project.metric.includes('TODO') && (
                  <span className="text-xs text-green-600 dark:text-green-400 whitespace-nowrap">
                    {project.metric}
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="mb-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Education
        </h2>
        <div className="border-l-2 border-gray-200 dark:border-gray-800 pl-4">
          <div className="flex items-start justify-between gap-4 mb-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
              Nankai University
            </h3>
            <span className="text-sm text-gray-500 dark:text-gray-500">
              Expected 2028
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            B.S. in Physics
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Relevant coursework: Computational Physics, Numerical Methods, Linear Algebra, Probability & Statistics
          </p>
        </div>
      </section>

      {/* Contact */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 uppercase tracking-wide">
          Contact
        </h2>
        <div className="flex flex-wrap gap-6 text-sm text-gray-600 dark:text-gray-400">
          <a
            href="mailto:2453204059@qq.com"
            className="hover:text-gray-900 dark:hover:text-gray-100"
          >
            2453204059@qq.com
          </a>
          <a
            href="https://github.com/AidenNovak"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-gray-100"
          >
            github.com/AidenNovak
          </a>
        </div>
      </section>
    </div>
  );
}
