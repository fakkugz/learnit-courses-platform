import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
    const store = await cookies();
    const token = store.get('token')?.value;


    if (!token) return NextResponse.json({ user: null });

    try {
        const payload = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString());
        return NextResponse.json({ user: payload });
    } catch {
        return NextResponse.json({ user: null });
    }
}
