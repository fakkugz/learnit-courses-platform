'use client';
import { useEffect } from 'react';
import { useCoursesStore } from '@/lib/store/useCoursesStore';
import CourseList from '@/components/CourseList';
import Pagination from '@/components/Pagination';
import { useSearchParams } from 'next/navigation';


export default function AllCoursesPage() {
  const { courses, fetchCourses } = useCoursesStore();
  const searchParams = useSearchParams();

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const query = searchParams.get('query')?.toLowerCase() || '';
  const filteredCourses = query
    ? courses.filter((course) =>
        course.title.toLowerCase().includes(query) ||
        course.category.toLowerCase().includes(query) ||
        course.desc_text.toLowerCase().includes(query)
      )
    : courses;

  const currentPage = parseInt(searchParams.get('page') || "1", 10);
  const perPage = 9;
  const totalPages = Math.ceil(filteredCourses.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedCourses = filteredCourses.slice(start, start + perPage);

  return (
    <main className="mx-12 mb-8 p-6">
      <h1 className="text-3xl font-bold text-primary-400 mb-7">
        {query ? `Results for "${query}"` : "All Courses"}
      </h1>

      {paginatedCourses.length > 0 ? (
        <>
          <CourseList courses={paginatedCourses} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath="/allcourses"
          />
        </>
      ) : (
        <p className="text-gray-500 text-lg">No courses found.</p>
      )}
    </main>
  );
}
