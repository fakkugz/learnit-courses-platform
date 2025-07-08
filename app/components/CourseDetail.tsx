'use client';
import Link from "next/link";
import { useState } from "react";
import { Course } from "@/components/CourseCard";
import { ArrowLeft } from "lucide-react";
import { useCartStore } from '@/lib/store/useCartStore';
import { useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/useAuthStore';
import toast from 'react-hot-toast';
import Image from "next/image";

export default function CourseDetail({ course }: { course: Course }) {
  const [expanded, setExpanded] = useState(false);
  const { addToCart } = useCartStore();
  const { user } = useAuthStore();
  const router = useRouter();

  const handleSubscribeNow = () => {
    if (!user) {
      toast.custom((t) => (
        <div
          className={`max-w-sm w-full bg-secondary-300-op-95 text-white rounded-lg shadow-md px-4 py-3 flex items-center space-x-3 transition-all duration-300 ${t.visible ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <span className="shrink-0" >🚫</span>
          < p className="text-sm leading-snug" >
            <strong className="font-semibold" > You must be logged in to subscribe. </strong>
          </p>
        </div>
      ), { duration: 4000 });
      router.push("/login");
      return;
    }

    addToCart(course);
    router.push('/cart');
  };

  return (
    <main className="max-w-[80%] mx-auto p-6 space-y-6">
      {/* Back Button */}
      <div>
        <Link href="/allcourses" className="inline-flex items-center text-primary-300 hover:underline font-semibold">
          <ArrowLeft className="w-5 h-5 mr-1" />
          Back to Courses
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Section */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold text-primary-400">{course.title}</h1>
          <p className="text-sm text-gray-600">{course.category} • {course.language}</p>

          <Image
            src={course.pic}
            alt={course.title}
            width={800}
            height={256}
            className="w-full h-64 object-cover rounded shadow-strong"
            style={{ objectFit: "cover" }}
          />
          <p className={`text-gray-800 text-sm whitespace-pre-line ${expanded ? '' : 'line-clamp-[10]'}`}>
            {course.desc_text}
          </p>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-primary-200 text-sm underline hover:text-primary-300 cursor-pointer"
          >
            {expanded ? 'See less' : 'See more'}
          </button>

          <p className="text-sm text-gray-700">
            ⭐ {course.rating} • {course.duration} hours
          </p>
          <p className="text-sm text-gray-400">
            Expires: {new Date(course.expiry).toLocaleDateString()}
          </p>
        </div>

        {/* Right Section - CTA Sticky */}
        <div className="w-full lg:w-1/3 h-fit sticky top-24 self-start">
          <div className="border border-primary-300 rounded-lg p-6 shadow-strong bg-white space-y-5">
            <p className="text-3xl font-bold text-primary-300">{course.org_price}</p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => addToCart(course)}
                className="text-primary-300 cursor-pointer border rounded py-2 px-4 hover:bg-primary-300 hover:text-white transition-colors font-semibold">
                Add to Cart
              </button>
              <button
                onClick={handleSubscribeNow}
                className="bg-primary-300 cursor-pointer text-white rounded py-2 px-4 hover:bg-primary-200 transition-colors font-semibold">
                Subscribe Now
              </button>
            </div>

            <Link
              href={course.coupon}
              className="block text-center border border-secondary-300 hover:bg-secondary-200 hover:border-secondary-100 rounded py-2 px-4 text-sm font-medium text-secondary-200 hover:text-white transition"
            >
              See in Udemy
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
