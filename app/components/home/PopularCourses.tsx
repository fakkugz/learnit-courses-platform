'use client';
import { useEffect, useState } from 'react';
import CourseCard, { Course } from '@/components/CourseCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type PopularCoursesProps = {
  courses: Course[];
};

export default function PopularCourses({ courses }: PopularCoursesProps) {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);

  useEffect(() => {
    const topCourses = courses.filter((c) => c.rating > 4.5);
    setPopularCourses(topCourses);
  }, [courses]);

  if (!popularCourses.length) return null;

  return (
    <section className="px-6 md:px-5 py-7 relative">
      <button
        className="popular-button-prev absolute
              z-10 bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
              rounded-full shadow flex items-center justify-center cursor-pointer"
      >
        <ChevronLeft className="w-9 h-9 text-secondary-400 hover:text-white transition-colors cursor-pointer" />
      </button>

      <button
        className="popular-button-next absolute
              z-10 bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
              rounded-full shadow flex items-center justify-center cursor-pointer"
      >
        <ChevronRight className="w-9 h-9 text-secondary-400 hover:text-white transition-colors cursor-pointer" />
      </button>
      <div className="flex space-x-4 overflow-x-auto pb-4 scrollbar-hide">

        {/* Swiper con CourseCards */}
        <Swiper
          spaceBetween={16}
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            nextEl: '.popular-button-next',
            prevEl: '.popular-button-prev',
          }}
          className="!px-5"
        >
          {popularCourses.map((course) => (
            <SwiperSlide key={course.id} className="!w-[300px]">
              <CourseCard course={course} showDescription={false} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
