import { getCourses } from "@/lib/getCourses";
import { Course } from "@/components/CourseCard";
import CourseDetail from "@/components/CourseDetail";

export default async function CoursePage(
  props: {
    params: Promise<{ id: string }>
  }
) {
  const params = await props.params; 
  const courses: Course[] = await getCourses();
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    return (
      <main className="p-10 text-center text-red-600">
        <h1 className="text-2xl font-bold">Course not found</h1>
      </main>
    );
  }

  return <CourseDetail course={course} />;
}
