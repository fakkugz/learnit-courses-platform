import { NextRequest, NextResponse } from 'next/server';
import { updateUserFavorites } from '@/lib/usersStore';

export async function POST(req: NextRequest) {
    console.log("🔥 API /api/updateFavorites loaded");

    try {
        const body = await req.json();
        const { email, favorites } = body;

        if (!email || !Array.isArray(favorites)) {
            return NextResponse.json({ message: 'Invalid data' }, { status: 400 });
        }

        updateUserFavorites(email, favorites);

        return NextResponse.json({ message: 'Favorites updated' });
    } catch (error) {
        console.error('❌ API error:', error);
        return NextResponse.json({ message: 'Error updating favorites' }, { status: 500 });
    }
}
