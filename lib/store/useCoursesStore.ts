import { create } from 'zustand';
import { Course } from '@/components/CourseCard';
import { getCourses } from '@/lib/getCourses';

type State = {
  courses: Course[];
  categories: string[];
  loading: boolean;
  fetchCourses: () => Promise<void>;
};

export const useCoursesStore = create<State>((set) => ({
  courses: [],
  categories: [],
  loading: false,
  fetchCourses: async () => {
    set({ loading: true });

    try {
      const data = await getCourses();
      const uniqueCategories = [...new Set(data.map((course) => course.category))];

      set({ courses: data, categories: uniqueCategories, loading: false });
    } catch (error) {
      console.error('Failed to fetch courses:', error);
      set({ loading: false });
    }
  },
}));