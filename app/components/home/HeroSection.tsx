'use client';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="flex flex-col-reverse md:flex-row items-center justify-between py-12 px-6 md:px-20 bg-gradient-to-br from-primary-400 to-primary-300">
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-6 leading-tight">
          Learn Anything, <br /> Anytime, Anywhere
        </h1>
        <p className="text-gray-200 text-lg mb-6">
          Find the best free online courses and start learning today.
        </p>
        <a
          href="/signup"
          className="inline-block bg-secondary-300 text-white px-6 py-3 rounded-xl font-semibold hover:bg-secondary-200 transition-colors"
        >
          Join Now
        </a>
      </div>

      <div className="md:w-1/2 mb-10 md:mb-0 flex justify-center">
        <Image
          src="https://images.unsplash.com/photo-1593642634367-d91a135587b5?auto=format&fit=crop&w=1600&q=80"
          alt="Learning Illustration"
          width={500}
          height={400}
          className="object-contain rounded-3xl"
        />
      </div>
    </section>
  );
}
