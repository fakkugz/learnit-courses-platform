import { Course } from '@/components/CourseCard';
import { create } from 'zustand';

type User = {
    name: string;
    email: string;
    favorites: string[];
    subscriptions: string[];
};


type AuthState = {
    user: User | null;
    setUser: (user: User) => void;
    toggleFavorite: (course: Course) => Promise<void>;
    toggleSubscription: (courseId: string) => void;
    logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
    user: null,

    setUser: (user) =>
        set({
            user: {
                name: user.name,
                email: user.email,
                favorites: user.favorites ?? [],
                subscriptions: user.subscriptions ?? [],
            },
        }),

    toggleFavorite: async (course) => {
        const { user } = get();
        if (!user) return;

        const isFavorite = user.favorites.includes(course.id);
        const updatedFavorites = isFavorite
            ? user.favorites.filter((id) => id !== course.id)
            : [...user.favorites, course.id];

        // Actualiza Zustand local
        set({ user: { ...user, favorites: updatedFavorites } });

        // 🔥 Llama a la API para persistir
        try {
            const res = await fetch("/api/updateFavorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: user.email,
                    favorites: updatedFavorites,
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to sync favorites");
            }

        } catch (err) {
            console.error("❌ Error syncing favorites:", err);
        }
    },

    toggleSubscription: (courseId) => {
        const { user } = get();
        if (!user) return;

        const subscriptions = user.subscriptions.includes(courseId)
            ? user.subscriptions.filter((id) => id !== courseId)
            : [...user.subscriptions, courseId];

        set({ user: { ...user, subscriptions } });
    },

    logout: async () => {
        await fetch('/api/logout', { method: 'GET' });
        set({ user: null });
    },
}));
