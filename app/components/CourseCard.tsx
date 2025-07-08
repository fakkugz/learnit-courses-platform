'use client';
import Link from "next/link";
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { useCartStore } from '@/lib/store/useCartStore';
import Image from "next/image";


export type Course = {
  id: string;
  title: string;
  pic: string;
  coupon: string;
  org_price: string;
  desc_text: string;
  category: string;
  language: string,
  rating: number;
  duration: number;
  expiry: string;
  savedtime: string
};

type Props = {
  course: Course;
  showDescription?: boolean;
  showFooter?: boolean;
  showCategoryInfo?: boolean;
  minicard?: boolean;
};

export default function CourseCard({
  course,
  showDescription = true,
  showFooter = true,
  showCategoryInfo = true,
  minicard = true
}: Props) {

  const { toggleFavorite, user } = useAuthStore();
  const isFavorite = user?.favorites.includes(course.id) ?? false;

  const { addToCart } = useCartStore();

  const handleToggleFavorite = async () => {
    const wasFavorite = isFavorite;
    await toggleFavorite(course);
    toast.custom((t) => (
      <div
        className={`max-w-sm w-full bg-primary-300 text-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-3 transition-all duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'
          }`}
      >
        <span className="text-green-400 text-lg mt-0.5 shrink-0 drop-shadow-[3px_3px_6px_rgba(0,0,0,0.3)]">
          {wasFavorite ? '❌' : '✅'}
        </span>
        <p className="text-sm leading-snug">
          <strong className="font-semibold">{course.title}</strong> was {wasFavorite ? 'removed from' : 'added to'} favorites.
        </p>
      </div>
    ), {
      duration: 4000,
    });
  };

  return (
    <div className={`flex flex-col h-full border border-primary-400 rounded-lg overflow-hidden shadow-strong
      transition duration-200 bg-white ${minicard ? 'min-h-[270px]' : ''}`}>
      <Link href={`/course/${course.id}`} className="block flex-1 group">
        <div className="relative h-40 overflow-hidden">
          <Image
            src={course.pic}
            alt={course.title}
            fill
            className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
        </div>

        <div className="p-4 space-y-2 flex flex-col h-full">
          <h3 className="text-primary-400 font-bold text-base">{course.title}</h3>

          {showCategoryInfo && (
            <p className="text-sm text-gray-600">
              {course.category} • {course.language}
            </p>
          )}

          {showDescription && (
            <p className="text-sm text-gray-900 line-clamp-3">
              {course.desc_text}
            </p>
          )}

          <p className="text-sm text-gray-600">
            Rating: ⭐ {Number(course.rating).toFixed(1)} • {course.duration} hrs • Expires:{" "}
            {new Date(course.expiry).toLocaleDateString()}
          </p>
        </div>
      </Link>

      {showFooter && (
        <div className="px-4 pb-4 mt-auto flex items-center justify-between gap-4">
          <p className="text-2xl text-primary-300 font-semibold">
            {course.org_price}
          </p>
          {user && (
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full border border-transparent hover:bg-gray-100 transition cursor-pointer"
            >
              <Heart
                className={`w-6 h-6 ${isFavorite ? 'text-primary-300 fill-primary-300' : 'text-gray-400'
                  }`}
              />
            </button>
          )}
          <button
            onClick={() => addToCart(course)}
            className="text-secondary-100 hover:text-white hover:bg-secondary-100 font-semibold border rounded-lg px-4 py-2 transition-colors cursor-pointer">
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}

