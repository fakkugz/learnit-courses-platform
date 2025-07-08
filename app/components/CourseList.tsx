import CourseCard from "@/components/CourseCard";
import { Course } from "@/components/CourseCard";

type Props = {
  courses: Course[];
};

export default function CourseList({ courses }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
