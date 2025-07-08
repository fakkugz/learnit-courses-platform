"use client";
import { useEffect, useState } from "react";
import { useCoursesStore } from "@/lib/store/useCoursesStore";
import HeroSection from "@/components/home/HeroSection";
import CategorySlider from "@/components/home/CategorySlider";
import PopularCourses from "@/components/home/PopularCourses";
import Testimonials from "@/components/home/Testimonials";
import CallToAction from "@/components/home/CallToAction";
import Link from "next/link";

export default function HomePage() {
  const { courses, categories, fetchCourses } = useCoursesStore();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]);


  const popularCourses = courses.filter((course) => course.rating >= 4.5);

  return (
    <main className="min-h-screen space-y-20">
      <HeroSection />

      <section className="px-4 md:px-12">
        <Link
          href='/allcourses'
          className="text-3xl font-bold text-primary-400 mb-2 ml-6">Explore Courses</Link>
        <CategorySlider
          categories={categories}
          courses={courses}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />
      </section>

      <CallToAction />

      <section className="px-4 md:px-12">
        <h2 className="text-3xl font-bold text-secondary-300 mb-6 ml-6">Popular Courses</h2>
        <PopularCourses courses={popularCourses} />
      </section>

      <section className="px-4 md:px-12">
        <h2 className="text-3xl text-center font-bold text-primary-400 mb-6 ml-6">What Our Students Say</h2>
        <Testimonials />
      </section>
    </main>
  );
}
