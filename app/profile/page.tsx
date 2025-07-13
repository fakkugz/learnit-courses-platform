'use client';

import { useState } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import CourseCard from '@/components/CourseCard';
import { useCoursesStore } from '@/lib/store/useCoursesStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function ProfilePage() {
    const { user, setUser } = useAuthStore();
    const { courses } = useCoursesStore();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
    });

    if (!user) {
        return <p className="text-center text-gray-500 text-xl mt-12">You must be logged in to view this page.</p>;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        setUser({ ...user, ...formData });
        setEditMode(false);
    };

    const favoriteCourses = courses.filter((c) => user.favorites.includes(c.id));
    const subscribedCourses = courses.filter((c) => user.subscriptions.includes(c.id));

    return (
        <main className="px-6 md:px-20 py-12 space-y-12">
            {/* User Info */}
            <section className="bg-white rounded-xl p-6 shadow-strong">
                <h2 className="text-2xl font-bold mb-4 text-secondary-400">User Information</h2>
                <div className="space-y-4">
                    <div className="flex justify-between items-center gap-4">
                        <div className="flex-1">
                            <label className="block font-semibold text-secondary-400">Name:</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                className={`border p-2 rounded w-full transition 
                                    ${editMode
                                        ? 'border-primary-300'
                                        : 'border-gray-300 bg-gray-100 text-gray-500'
                                    }`}
                            />
                        </div>

                        <div className="flex-1">
                            <label className="block font-semibold text-secondary-400">Email:</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                disabled={!editMode}
                                className={`border p-2 rounded w-full transition 
                                    ${editMode
                                        ? 'border-primary-300'
                                        : 'border-gray-300 bg-gray-100 text-gray-500'
                                    }`}
                            />
                        </div>

                        <button
                            onClick={editMode ? handleSave : () => setEditMode(true)}
                            className="h-10 mt-6 px-4 py-2 bg-primary-300 text-white rounded hover:bg-primary-400 transition cursor-pointer"
                        >
                            {editMode ? 'Save' : 'Edit'}
                        </button>
                    </div>
                </div>

            </section>

            {/* Subscribed Courses */}
            <section className="bg-white rounded-xl p-6 shadow-strong">
                <h2 className="text-2xl text-secondary-400 font-bold mb-4">My Courses</h2>
                {subscribedCourses.length ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        {subscribedCourses.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                showDescription={false}
                                showFooter={false}
                                showCategoryInfo={false}
                                minicard={true}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">You haven&apos;t subscribed to any courses yet.</p>
                )}
            </section>

            {/* Favorites */}
            <section className="bg-white rounded-xl p-6 shadow-strong">
                <h2 className="text-2xl text-secondary-400 font-bold mb-4">Favorite Courses</h2>

                {favoriteCourses.length ? (
                    <section className="relative">
                        {/* Botones personalizados */}
                        <button
                            className="favorites-button-prev absolute -left-4 top-1/2 -translate-y-1/2 z-10
          bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
          rounded-full shadow flex items-center justify-center w-10 h-10 cursor-pointer"
                        >
                            <ChevronLeft className="w-6 h-6 text-secondary-400 hover:text-white transition-colors cursor-pointer" />
                        </button>

                        <button
                            className="favorites-button-next absolute -right-4 top-1/2 -translate-y-1/2
          z-10 bg-white border border-secondary-400 hover:bg-secondary-200 transition-colors
          rounded-full shadow flex items-center justify-center w-10 h-10 cursor-pointer"
                        >
                            <ChevronRight className="w-6 h-6 text-secondary-400 hover:text-white transition-colors cursor-pointer" />
                        </button>

                        {/* Slider */}
                        <Swiper
                            modules={[Navigation]}
                            navigation={{
                                nextEl: '.favorites-button-next',
                                prevEl: '.favorites-button-prev',
                            }}
                            spaceBetween={16}
                            slidesPerView={1}
                            breakpoints={{
                                640: { slidesPerView: 1.2 },
                                768: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 3.2 },
                            }}
                            className="py-6 px-2"
                        >
                            {favoriteCourses.map((course) => (
                                <SwiperSlide key={course.id}>
                                    <CourseCard
                                        course={course}
                                        showDescription={false}
                                        showFooter={false}
                                        showCategoryInfo={false}
                                        minicard={true}
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </section>
                ) : (
                    <p className="text-gray-500">You haven&apos;t added any favorites yet.</p>
                )}
            </section>
        </main>
    );
}
