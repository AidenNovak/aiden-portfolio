import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { listProjects, writeProject, slugExists, generateSlug, parseProjectFromFile } from '@/lib/admin/projects';
import { createProjectSchema, type CreateProjectData } from '@/lib/admin/validation';
import { commitChanges } from '@/lib/admin/git';

// Admin API routes are only available in development mode
export const dynamic = 'error';

export async function GET(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = listProjects();
    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Validate input
    const result = createProjectSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: result.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const data = result.data as CreateProjectData;

    // Check if slug already exists
    if (slugExists(data.slug)) {
      return NextResponse.json(
        { success: false, error: `Project with slug "${data.slug}" already exists` },
        { status: 409 }
      );
    }

    // Write project file
    writeProject(data.slug, data);

    // Commit to git
    const filePath = `content/projects/${data.slug}.mdx`;
    await commitChanges(`Create project: ${data.title}`, [filePath]);

    return NextResponse.json({
      success: true,
      data: { slug: data.slug, message: 'Project created successfully' },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to create project' },
      { status: 500 }
    );
  }
}
