'use client';

import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-primary-300 py-12 px-6 md:px-20 rounded-xl text-white text-center mt-12 mb-16">
      <h2 className="text-3xl font-bold mb-4">
        Join LearnIt today and unlock unlimited learning opportunities!
      </h2>
      <p className="mb-6 max-w-xl mx-auto">
        Sign up now to access all courses, save favorites, and track your progress.
      </p>
      <Link
        href="/signup"
        className="inline-block bg-white text-primary-300 font-semibold px-8 py-3 rounded-full shadow hover:bg-gray-100 transition"
      >
        Get Started
      </Link>
    </section>
  );
}
