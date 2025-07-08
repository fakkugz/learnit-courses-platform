'use client';
import { useCoursesStore } from '@/lib/store/useCoursesStore';
import { useEffect } from 'react';

export default function Footer() {

  const { categories, fetchCourses } = useCoursesStore();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return (
    <footer className="bg-primary-400 text-white">
      {/* Grid principal */}
      <div className="max-w-7xl mx-auto px-9 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Marca */}
        <div>
          <h2 className="text-2xl font-bold mb-4">LearnIT</h2>
        </div>

        {/* Categorías */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Categories</h3>
          <ul className="space-y-1">
            {categories.map((cat, idx) => (
              <li key={idx} className="text-sm hover:underline cursor-pointer">{cat}</li>
            ))}
          </ul>
        </div>

        {/* Planes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Go Premium</h3>
          <ul className="space-y-1">
            <li className="text-sm hover:underline cursor-pointer">Free</li>
            <li className="text-sm hover:underline cursor-pointer">Basic</li>
            <li className="text-sm hover:underline cursor-pointer">Premium</li>
          </ul>
        </div>

        {/* Secciones adicionales */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Explore</h3>
          <ul className="space-y-1">
            <li className="text-sm hover:underline cursor-pointer">About Us</li>
            <li className="text-sm hover:underline cursor-pointer">Contact</li>
            <li className="text-sm hover:underline cursor-pointer">Support</li>
            <li className="text-sm hover:underline cursor-pointer">Careers</li>
            <li className="text-sm hover:underline cursor-pointer">Blog</li>
          </ul>
        </div>
      </div>

      {/* Línea divisoria */}
      <div className="border-t border-white" />

      {/* Sección inferior */}
      <div className="bg-secondary-300 text-white text-center py-4">
        <p className="text-sm">
          © 2025 Made with <span className="text-green-400">♥</span> by FakkuGZ. No rights reserved.
        </p>
      </div>
    </footer>
  );
}
