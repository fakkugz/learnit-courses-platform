import { create } from 'zustand';
import { Course } from '@/components/CourseCard';
import toast from 'react-hot-toast';
import { useAuthStore } from '@/lib/store/useAuthStore';

type CartState = {
    cart: Course[];
    addToCart: (course: Course) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    cart: [],
    addToCart: (course) => {
        const { cart } = get();
        const exists = cart.some(c => c.id === course.id);
        const user = useAuthStore.getState().user;

        if (!user) {
            toast.custom((t) => (
                <div
                    className={`max-w-sm w-full bg-secondary-300-op-95 text-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-3 transition-all duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <span className="shrink-0" >🚫</span>
                    < p className="text-sm leading-snug" >
                        <strong className="font-semibold" > You must be logged in to add courses to cart. </strong>
                    </p>
                </div>
            ), { duration: 4000 });
            return;
        }

        if (!exists) {
            const updatedCart = [...cart, course];
            set({ cart: updatedCart });

            toast.custom((t) => (
                <div
                    className={`max-w-sm w-full bg-primary-300 text-white rounded-lg shadow-md px-4 py-3 flex itemscenter space-x-3 transition-all duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <span className="text-green-400 text-lg mt-0.5 shrink-0 drop-shadow-[2px_2px_6px_rgba(0,0,0,0.6)]" >🛒</span>
                    < p className="text-sm leading-snug" >
                        <strong className="font-semibold" > {course.title} </strong> was added to cart.
                    </p>
                </div>
            ), { duration: 4000 });
        } else {
            toast.custom((t) => (
                <div
                    className={`max-w-sm w-full bg-secondary-300-op-95 text-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-3 transition-all duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    <span className="text-yellow-200 text-lg mt-0.5 shrink-0" >⚠️</span>
                    < p className="text-sm leading-snug" >
                        <strong className="font-semibold" > {course.title} </strong> is already in the cart.
                    </p>
                </div>
            ), { duration: 4000 });
        }
    },
    removeFromCart: (id) => {
        set({ cart: get().cart.filter(c => c.id !== id) });
    },
    clearCart: () => {
        set({ cart: [] });
    },
}));
