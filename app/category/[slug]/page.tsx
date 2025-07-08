import { getCourses } from "@/lib/getCourses";
import CourseList from "@/components/CourseList";
import Pagination from "@/components/Pagination";
import { Course } from "@/components/CourseCard";

function deslugify(slug: string) {
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}


export default async function CategoryPage(
  props: Promise<{ params: { slug: string }; searchParams?: { page?: string } }>
) {
  const { params, searchParams } = await props;
  const data: Course[] = await getCourses();
  const categoryName = deslugify(params.slug).toLowerCase();

  const filtered = data.filter(
    (course) => course.category.toLowerCase() === categoryName
  );

  const currentPage = parseInt(searchParams?.page ?? "1", 10);
  const perPage = 6;
  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (currentPage - 1) * perPage;
  const paginatedCourses = filtered.slice(start, start + perPage);

  return (
    <main className="mx-12 mb-8 p-6">
      <h1 className="text-3xl font-bold text-primary-400 mb-7">
        {categoryName.toUpperCase()}
      </h1>

      <CourseList courses={paginatedCourses} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={`/category/${params.slug}`}
      />
    </main>
  );
}

export async function generateStaticParams() {
  const courses = await getCourses();

  const uniqueCategories = Array.from(
    new Set(
      courses.map((c) =>
        c.category.toLowerCase().replace(/\s+/g, "-")
      )
    )
  );

  return uniqueCategories.map((slug) => ({ slug }));
}