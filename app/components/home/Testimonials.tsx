'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

type Testimonial = {
  id: number;
  name: string;
  avatar: string;
  message: string;
};

export default function TestimonialsSlider() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    // Simulamos una API con comentarios ficticios
    const fakeTestimonials: Testimonial[] = [
      {
        id: 1,
        name: 'Jane Smith',
        avatar: '/avatars/2.jpg',
        message: 'LearnIt helped me level up my frontend skills in weeks!',
      },
      {
        id: 2,
        name: 'Carlos Gonzalez',
        avatar: '/avatars/9.jpg',
        message: 'Great variety of free courses. Very useful and updated.',
      },
      {
        id: 3,
        name: 'Amina Yusuf',
        avatar: '/avatars/44.jpg',
        message: 'Excellent platform. Highly recommended for beginners!',
      },
      {
        id: 4,
        name: 'John Doe',
        avatar: '/avatars/22.jpg',
        message: 'I found exactly what I needed to start a new career.',
      },
    ];

    setTestimonials(fakeTestimonials);
  }, []);

  return (
    <section className="px-6 md:px-20 py-12 bg-gray-50">
      <div className="flex flex-col gap-15 items-center">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="w-full max-w-2xl bg-white rounded-2xl shadow-strong p-10 text-center"
          >
            <Image
              src={t.avatar}
              alt={t.name}
              width={96}
              height={96}
              className="rounded-full mx-auto mb-5"
            />
            <p className="text-xl font-bold text-primary-300">{t.name}</p>
            <p className="text-lg text-gray-700 mt-4 leading-relaxed">&quot;{t.message}&quot;</p>
          </div>
        ))}
      </div>
    </section>

  );
}
