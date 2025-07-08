'use client';
import { cn } from '@/lib/utils/cn';
import CourseCard, { Course } from '@/components/CourseCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  categories: string[];
  courses: Course[];
  selected: string | null;
  onSelect: (category: string) => void;
};

export default function CategorySlider({ categories, courses, selected, onSelect }: Props) {

  const filteredCourses = selected
    ? courses.filter((c) => c.category === selected)
    : courses;

  return (
    <section className="px-6 md:px-20 py-6">

      {/* Slider de Categorías */}
      <div className="relative slider-category">
        <button
          className="swiper-button-prev absolute left-0 
             z-10 bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
             rounded-full shadow flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6 text-secondary-400 hover:text-white transition-colors" />
        </button>

        <button
          className="swiper-button-next absolute right-0 
             z-10 bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
             rounded-full shadow flex items-center justify-center"
        >
          <ChevronRight className="w-4 h-4 text-secondary-400 hover:text-white transition-colors" />
        </button>

        {/* Swiper */}
        <Swiper
          spaceBetween={12}
          slidesPerView="auto"
          modules={[Navigation]}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          className="!px-0 !mr-6"
        >
          {categories.map((cat) => (
            <SwiperSlide key={cat} className="!w-fit flex justify-center">
              <button
                onClick={() => onSelect(cat)}
                className={cn(
                  'px-4 py-2 rounded-lg border border-primary-300 whitespace-nowrap cursor-pointer',
                  selected === cat
                    ? 'bg-primary-300 text-white hover:bg-primary-200 transition-colors'
                    : 'bg-white text-primary-300 hover:bg-primary-200 hover:text-white transition-colors'
                )}
              >
                {cat}
              </button>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Cursos Filtrados */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8">
        {filteredCourses.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            showDescription={false}
          />
        ))}
      </div>
    </section>
  );
}
