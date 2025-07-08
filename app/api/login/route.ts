import { NextRequest, NextResponse } from 'next/server';
import { getUsers } from '@/lib/usersStore';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  const user = getUsers().find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 });
  }

  const token = Buffer.from(JSON.stringify({ email: user.email, name: user.name })).toString('base64');

  const res = NextResponse.json({ success: true });
  res.cookies.set('token', `header.${token}.signature`, {
    httpOnly: true,
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return res;
}
