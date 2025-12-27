# Aiden Novak - Personal Portfolio

A minimal, fast, and evidence-based personal website built with Next.js, TypeScript, and Tailwind CSS.

## Philosophy

This site is designed as a "credible evidence repository" rather than a self-introduction essay. It supports two reading modes:

- **10-second scan**: Who am I + what I can do + where's the strongest evidence + how to contact
- **2-minute deep read**: How I work, make tradeoffs, verify results, and whether I seem like someone you'd want on your team

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run start
```

Visit `http://localhost:3000`

## Deploy

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Static Export

The site is configured for static export (`output: 'export'`). Build artifacts are in `out/` directory and can be hosted anywhere:

- Netlify: Drag and drop the `out/` folder
- GitHub Pages: Push to `gh-pages` branch
- Any static host: Upload `out/` contents

## Customization

### Content

All content is stored as MDX files in the `content/` directory:

- **Projects**: `content/projects/*.mdx` - Each project has frontmatter for metadata
- **Articles**: `content/writing/*.mdx` - Blog posts and technical notes

### Personal Information

Search for `TODO` in the codebase to find all items that need to be replaced:

- Email addresses (currently `aiden@example.com`)
- GitHub/LinkedIn URLs
- Resume PDF (add `public/resume.pdf`)
- Project-specific metrics and links

### Styling

- Tailwind config: `tailwind.config.ts`
- Global styles: `app/globals.css`
- The site supports dark mode via `prefers-color-scheme`

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage
│   ├── projects/          # Projects pages
│   ├── writing/           # Writing pages
│   ├── resume/            # Resume page
│   └── contact/           # Contact page
├── components/            # Reusable components
├── content/               # MDX content files
│   ├── projects/
│   └── writing/
├── lib/                   # Utilities (MDX parsing)
└── public/                # Static assets
```

## Adding a Project

1. Create a new MDX file in `content/projects/my-project.mdx`
2. Add frontmatter:

```yaml
---
title: "Project Name"
description: "One-line description"
metric: "e.g., 10x faster"
tags: ["Python", "NumPy"]
summary: "built X that achieved Y"
background: "Why this project existed"
solution: "How I approached it"
decisions:
  - "Tradeoff A vs B, chose A because..."
highlights:
  - "Technical detail 1"
  - "Technical detail 2"
results: "Measurable outcome"
retrospective:
  - "What went wrong"
  - "What I'd do differently"
codeUrl: "https://github.com/..."
demoUrl: "https://..."
---
```

## Adding an Article

1. Create a new MDX file in `content/writing/my-article.mdx`
2. Add frontmatter:

```yaml
---
title: "Article Title"
date: "2024-11-15"
summary: "One-line summary"
---
```

3. Write your article using standard Markdown

## Performance

- Static generation (SSG) for fast page loads
- No client-side JavaScript for initial render
- Minimal dependencies
- Lighthouse target: 95+ across all categories

## License

MIT - feel free to use this as a template for your own portfolio.
