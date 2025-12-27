import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticated } from '@/lib/admin/auth';
import { readProject, updateProject, deleteProject, projectExists, parseProjectFromFile } from '@/lib/admin/projects';
import { projectSchema } from '@/lib/admin/validation';
import { commitChanges } from '@/lib/admin/git';
import { getProjectHistory, rollbackProject } from '@/lib/admin/git';

// Admin API routes are only available in development mode
export const dynamic = 'error';

export function generateStaticParams() {
  return [];
}

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await context.params;
    const { searchParams } = new URL(request.url);

    // Check if this is a history request
    if (searchParams.get('history') === 'true') {
      if (!projectExists(slug)) {
        return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
      }

      const history = await getProjectHistory(slug);
      return NextResponse.json({ success: true, data: history });
    }

    // Regular project fetch
    if (!projectExists(slug)) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    const fileContent = readProject(slug);
    const formData = parseProjectFromFile(slug);

    return NextResponse.json({
      success: true,
      data: { ...formData, slug, fileContent },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await context.params;
    const body = await request.json();

    if (!projectExists(slug)) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    // Check if this is a rollback request
    if (body.rollback && body.commit) {
      await rollbackProject(slug, body.commit);

      // Commit the rollback
      await commitChanges(`Rollback ${slug} to ${body.commit.substring(0, 7)}`, [`content/projects/${slug}.mdx`]);

      // Return updated data
      const formData = parseProjectFromFile(slug);
      return NextResponse.json({
        success: true,
        data: { slug, message: 'Project rolled back successfully', frontmatter: formData },
      });
    }

    // Regular update
    const result = projectSchema.safeParse(body);
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

    const data = result.data;

    // Update project file
    updateProject(slug, data);

    // Commit to git
    const filePath = `content/projects/${slug}.mdx`;
    await commitChanges(`Update project: ${data.title}`, [filePath]);

    return NextResponse.json({
      success: true,
      data: { slug, message: 'Project updated successfully' },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to update project' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug } = await context.params;

    if (!projectExists(slug)) {
      return NextResponse.json({ success: false, error: 'Project not found' }, { status: 404 });
    }

    // Store title before deleting
    const formData = parseProjectFromFile(slug);
    const title = formData.title;

    // Delete project file
    deleteProject(slug);

    // Commit to git
    const filePath = `content/projects/${slug}.mdx`;
    await commitChanges(`Delete project: ${title}`, [filePath]);

    return NextResponse.json({
      success: true,
      data: { slug, message: 'Project deleted successfully' },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Failed to delete project' },
      { status: 500 }
    );
  }
}
