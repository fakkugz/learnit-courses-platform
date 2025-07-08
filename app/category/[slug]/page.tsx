import { getCourses } from "@/lib/getCourses";
import CourseList from "@/components/CourseList";
import Pagination from "@/components/Pagination";
import { Course } from "@/components/CourseCard";

function deslugify(slug: string) {
  // Decodifica URL, reemplaza guiones por espacios, limpia espacios extra
  return decodeURIComponent(slug).replace(/-/g, " ").trim();
}

type Props = {
  params: { slug: string };
  searchParams?: { page?: string };
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const data: Course[] = await getCourses();
  const categoryName = deslugify(params.slug).toLowerCase();

  const filtered = data.filter(
    course => course.category.toLowerCase() === categoryName
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
