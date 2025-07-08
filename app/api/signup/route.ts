import { NextRequest, NextResponse } from 'next/server';
import { addUser, getUsers } from '@/lib/usersStore';

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();

  const existingUser = getUsers().find(user => user.email === email);
  if (existingUser) {
    return NextResponse.json({ message: 'User already exists' }, { status: 400 });
  }

  addUser({ name, email, password });
  return NextResponse.json({ success: true });
}
