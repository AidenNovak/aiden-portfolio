# TODO Checklist for Aiden's Portfolio

This file lists all items marked as TODO in the codebase. Complete these to make your site production-ready.

## Critical (Must Do Before Launch)

### Personal Information
- [ ] Replace `aiden@example.com` with your real email in:
  - `app/contact/page.tsx`
  - `components/Footer.tsx`
- [ ] Replace GitHub URL `https://github.com/aidennovak` with real URL
- [ ] Replace LinkedIn URL `https://linkedin.com/in/aidennovak` with real URL
- [ ] Add your resume PDF as `public/resume.pdf`

### Projects
For each project in `content/projects/`:

1. **numerical-solver.mdx** (Monte Carlo Simulation)
   - [ ] Replace `metric: "TODO: e.g., 10x faster than baseline"` with actual result
   - [ ] Replace `results: "TODO: Replace with actual metrics..."` with specific measurements
   - [ ] Update `codeUrl` with real GitHub repository link
   - [ ] Add `demoUrl` if there's a live demo
   - [ ] Review and update content to match your actual project

2. **data-analysis-tool.mdx** (Data Analysis Pipeline)
   - [ ] Replace `metric: "TODO: e.g., Reduced analysis time..."` with actual result
   - [ ] Replace `results: "TODO: Replace with actual metrics..."` with specific measurements
   - [ ] Update `codeUrl` with real GitHub repository link
   - [ ] Review and update content to match your actual project

3. **ml-classifier.mdx** (Signal Classification)
   - [ ] Replace `metric: "TODO: e.g., 94% accuracy on test set"` with actual result
   - [ ] Replace `results: "TODO: Replace with actual metrics..."` with specific measurements
   - [ ] Update `codeUrl` with real GitHub repository link
   - [ ] Review and update content to match your actual project

### Education
- [ ] Update graduation year in `app/resume/page.tsx` (currently `TODO: Add graduation year`)

## Optional (Improves Site Quality)

### Content
- [ ] Add more projects if you have additional strong examples
- [ ] Add more articles to the Writing section
- [ ] Replace placeholder projects with your actual best work
- [ ] Consider adding an "About" page if you have more to share

### Technical
- [ ] Add a real favicon to `public/favicon.ico`
- [ ] Add OpenGraph image (`public/opengraph-image.png`)
- [ ] Set up analytics if desired (Plausible, Vercel Analytics, etc.)
- [ ] Add sitemap generation for better SEO
- [ ] Consider adding RSS feed for writing section

### Proofreading
- [ ] Review all text for typos
- [ ] Ensure all dates are correct
- [ ] Check all external links work
- [ ] Test on mobile devices

## Metrics Guidance

When replacing TODO metrics, try to be specific:

**Good examples:**
- "Reduced processing time from 2 hours to 5 minutes"
- "Achieved 94% accuracy vs 89% baseline"
- "Simulated 100x100 lattices in under 5 seconds"

**If you don't have exact numbers:**
- Estimate based on your observations
- Describe relative improvement ("~10x faster")
- Leave a note if measurement methodology needs refinement

## Launch Checklist

Before sharing your site URL:

- [ ] Run `npm run build` and ensure no errors
- [ ] Test `npm run start` to preview production build
- [ ] Check all pages load correctly
- [ ] Verify all links work (including external ones)
- [ ] Test on mobile (use Chrome DevTools or real device)
- [ ] Test dark mode toggling on your OS
- [ ] Run Lighthouse audit and aim for 90+ scores
