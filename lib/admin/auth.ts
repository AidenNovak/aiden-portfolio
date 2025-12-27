import { cookies } from 'next/headers';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin';
const SESSION_COOKIE_NAME = 'admin-session';
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}

export function createSession(): string {
  // Simple session token using timestamp + random string
  // In production, use a proper JWT or session management
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${timestamp}:${random}`).toString('base64');
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    path: '/admin',
    maxAge: SESSION_MAX_AGE,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });
}

export async function getSession(): Promise<string | null> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE_NAME)?.value || null;
}

export async function clearSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

export async function isAuthenticated(): Promise<boolean> {
  const session = await getSession();
  return session !== null;
}

// For client-side usage
export function getAdminPasswordHash(): string {
  // Return a simple hash of the password for client-side comparison
  // This is NOT secure, but sufficient for a local dev admin interface
  return Buffer.from(ADMIN_PASSWORD).toString('base64');
}
