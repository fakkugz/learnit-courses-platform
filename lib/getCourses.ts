import courses from "@/data/courses.json";
import { Course } from "@/components/CourseCard";

export async function getCourses(): Promise<Course[]> {
  return courses;
}
