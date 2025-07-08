'use client';
import { useCartStore } from "@/lib/store/useCartStore";
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Image from "next/image";

export default function CartPage() {
  const { cart, removeFromCart, clearCart } = useCartStore();
  const { user, toggleSubscription } = useAuthStore();
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const subtotal = cart.reduce((acc, course) => acc + parseFloat(course.org_price.replace(/[^0-9.]/g, '')), 0);
  const formattedSubtotal = subtotal.toFixed(2);
  const total = (subtotal - 0).toFixed(2); // futuro descuento

  const handleSubscribe = () => {
    if (!user || cart.length === 0) return;

    cart.forEach((course) => {
      toggleSubscription(course.id);
    });

    clearCart();
    setShowModal(true);
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-6 text-center">
        <h2 className="text-2xl text-primary-300 font-bold">You must be logged in to view your cart.</h2>
        <Link href="/login" className="text-primary-300 underline mt-4 inline-block">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100 max-w-6xl mx-auto py-10 px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

      {/* Sección izquierda: Lista de cursos */}
      <section className="md:col-span-2 bg-white rounded-xl p-6 shadow-strong">
        <h1 className="text-3xl font-bold mb-6 text-secondary-400 border-b border-b-gray-500 pb-3">
          {user.name}&apos;s Cart
        </h1>

        {cart.length === 0 ? (
          <p>No courses in cart. <Link href="/allcourses" className="text-primary-300 underline">Browse Courses</Link></p>
        ) : (
          <>
            <div className="space-y-6">
              {cart.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between pb-4 cursor-pointer group"
                  onClick={() => router.push(`/course/${course.id}`)}
                >
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromCart(course.id);
                      }}
                      className="text-red-500 hover:text-red-700 cursor-pointer"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                    <Image
                      src={course.pic}
                      alt={course.title}
                      width={56}
                      height={56}
                      className="object-cover rounded"
                    />
                    <p className="font-semibold text-gray-800">{course.title}</p>
                  </div>
                  <p className="text-primary-300 font-semibold">
                    $ {parseFloat(course.org_price.replace(/[^0-9.]/g, '')).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Subtotal */}
            <div className="pt-4 flex justify-end border-t border-t-gray-500 text-gray-900">
              <p className="text-lg font-bold">
                Subtotal: ${formattedSubtotal}
              </p>
            </div>
          </>
        )}
      </section>

      {/* Sección derecha: Resumen */}
      <section className="bg-white rounded-xl p-6 shadow-strong">
        <h2 className="text-2xl font-bold mb-4 text-secondary-400 border-b border-b-gray-500 pb-3">
          Order Summary
        </h2>

        <div className="space-y-2">
          <div className="flex justify-between">
            <p className="text-gray-700">Courses ({cart.length}):</p>
            <p className="font-semibold text-primary-400">${formattedSubtotal}</p>
          </div>
          <div className="flex justify-between mb-8">
            <p className="text-gray-700">Discounts Applied:</p>
            <p className="font-semibold text-primary-400">$0.00</p>
          </div>

          <div className="flex justify-between text-lg font-bold border-t border-b border-gray-500 py-2 mb-6">
            <p>Total:</p>
            <p className="text-secondary-400">${total}</p>
          </div>

          <button
            className="w-full bg-primary-300 text-white py-2 px-4 rounded hover:bg-primary-200 transition-colors font-semibold cursor-pointer"
            onClick={handleSubscribe}
          >
            Subscribe Now
          </button>

          <button
            onClick={clearCart}
            className="w-full border border-red-400 text-red-500 py-2 px-4 rounded hover:bg-secondary-300 hover:text-white transition-colors font-semibold cursor-pointer"
          >
            Clear Cart
          </button>
        </div>
      </section>

      {/* ✅ Modal de Confirmación */}
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="text-center p-6">
            <h2 className="text-2xl font-bold text-secondary-400 mb-4">You&apos;re subscribed!</h2>
            <p className="text-gray-700 mb-6">
              Your selected courses have been added to your profile. You can now start learning!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/profile"
                className="bg-primary-300 text-white px-4 py-2 rounded hover:bg-primary-200 transition"
              >
                Go to Profile
              </Link>
              <Link
                href="/allcourses"
                className="border border-primary-300 text-primary-300 px-4 py-2 rounded hover:bg-primary-200 hover:text-white transition"
              >
                Explore More Courses
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
