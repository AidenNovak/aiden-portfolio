import { NextRequest, NextResponse } from 'next/server';
import { verifyPassword, setSessionCookie } from '@/lib/admin/auth';

// Admin API routes are only available in development mode
export const dynamic = 'error';

export async function POST(request: NextRequest) {
  try {
    const { password } = await request.json();

    if (verifyPassword(password)) {
      const session = await setSessionCookie(createSession());
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ success: false, error: 'Invalid password' }, { status: 401 });
  } catch {
    return NextResponse.json({ success: false, error: 'Login failed' }, { status: 500 });
  }
}

function createSession(): string {
  return Buffer.from(`${Date.now()}:${Math.random().toString(36).substring(2)}`).toString('base64');
}
