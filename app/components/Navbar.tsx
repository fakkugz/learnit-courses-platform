"use client";
import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useAuthStore } from '@/lib/store/useAuthStore';
import { useCoursesStore } from '@/lib/store/useCoursesStore';
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store/useCartStore";


export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { categories, fetchCourses } = useCoursesStore();
    const { cart } = useCartStore();

    const [open, setOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const searchParams = useSearchParams();
    const pathname = usePathname();

    const { replace } = useRouter();
    const router = useRouter();

    const { user, logout } = useAuthStore();

    const handleSearch = (term: string) => {
        const params = new URLSearchParams(searchParams);

        if (term) {
            params.set("query", term);
            params.set("page", "1");
        } else {
            params.delete("query");
            params.set("page", "1");
        }

        const targetPath = pathname === "/allcourses" ? pathname : "/allcourses";
        replace(`${targetPath}?${params.toString()}`);
    };

    const handleLogout = async () => {
        await logout();
        router.push('/');
    };

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Mobile Menu Button */}
                    <div className="flex items-center lg:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-gray-700 hover:text-primary-200"
                        >
                            <Bars3Icon className="h-8 w-8" />
                        </button>
                    </div>

                    {/* Logo */}
                    <div className="flex-1 flex justify-center lg:justify-start">
                        <Link href="/" className="text-2xl font-bold text-primary-200">
                            LearnIT
                        </Link>
                    </div>

                    {/* Search + Categories + Links (Desktop) */}
                    <div className="hidden lg:flex lg:items-center lg:gap-4 flex-nowrap">
                        {/* Search Bar */}
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.currentTarget;
                                const input = form.querySelector("input") as HTMLInputElement;
                                handleSearch(input.value);
                            }}
                            className="flex items-center border border-secondary-200 rounded-3xl overflow-hidden w-full max-w-md"
                        >
                            <input
                                type="text"
                                name="search"
                                defaultValue={searchParams.get("query")?.toString()}
                                placeholder="Search courses..."
                                className="px-3 py-2 flex-1 min-w-0 focus:outline-none"
                            />
                            <button type="submit" className="px-3 text-primary-300 cursor-pointer">
                                <MagnifyingGlassIcon className="h-6 w-6" />
                            </button>
                        </form>

                        {/* Categories Dropdown */}
                        <div className="relative inline-block text-left" ref={dropdownRef}>
                            <div>
                                <button
                                    type="button"
                                    onClick={() => setOpen(!open)}
                                    className="inline-flex items-center w-full justify-center gap-x-1 rounded-md bg-white
                                        px-3 py-2 text-base font-semibold text-gray-900 shadow-xs hover:bg-gray-50 cursor-pointer"
                                    aria-expanded={open}
                                    aria-haspopup="true"
                                >
                                    Categories
                                    <ChevronDownIcon
                                        className="-mr-1 h-5 w-5 text-gray-800"
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>

                            {open && (
                                <div
                                    className="absolute left-0 z-10 mt-2 w-65 origin-top-right rounded-md bg-white shadow-strong ring-1 ring-black/5 focus:outline-none transition transform duration-100"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="menu-button"
                                    tabIndex={-1}
                                >
                                    <div className="py-1" role="none">
                                        <Link
                                            href="/allcourses"
                                            onClick={() => setOpen(false)}
                                            className="block px-4 py-2 font-semibold text-gray-900 hover:bg-primary-300 hover:text-white"
                                        >
                                            All Courses
                                        </Link>
                                        {categories.map((cat, index) => (
                                            <Link
                                                href={`/category/${encodeURIComponent(
                                                    cat.toLowerCase().replace(/\s+/g, "-")
                                                )}`}
                                                key={index}
                                                onClick={() => setOpen(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-300 hover:text-white"
                                                role="menuitem"
                                            >
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-3 whitespace-nowrap">
                            {/* Go Premium Button */}
                            <Link
                                href="/plans"
                                className="text-secondary-200 hover:text-secondary-100 font-semibold"
                            >
                                Go Premium
                            </Link>

                            {/* Conditional User Buttons */}
                            {user && (
                                <Link href="/cart" className="relative">
                                    <ShoppingCart className="w-6 h-6 text-primary-300" />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                            )}
                            {user ? (
                                <>
                                    {/* Nombre del usuario */}
                                    <Link href='/profile' className="text-primary-300 pl-3 font-semibold">
                                        {user.name}
                                    </Link>

                                    {/* Botón Log Out */}
                                    <button
                                        onClick={handleLogout}
                                        className="ml-2 px-3 py-1 bg-primary-300 text-white border rounded hover:bg-primary-200 transition-colors cursor-pointer"
                                    >
                                        Log Out
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/signup"
                                        className="text-primary-300 hover:text-white hover:bg-primary-200 border rounded px-3 py-1 transition-colors cursor-pointer">
                                        Sign Up
                                    </Link>
                                    <Link
                                        href="/login"
                                        className="ml-2 px-4 py-1 bg-primary-300 text-white border rounded hover:bg-primary-200 transition-colors cursor-pointer inline-block text-center"
                                    >
                                        Log In
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Right Icons (Mobile) */}
                    <div className="flex items-center gap-2 lg:hidden">
                        <MagnifyingGlassIcon className="h-6 w-6 text-gray-700" />
                        <Link
                            href='/login'
                            className="px-3 py-1 bg-primary-300 text-white rounded hover:bg-primary-200 transition-colors cursor-pLink">
                            Log In
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu Placeholder */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden mt-2 p-4 bg-gray-50 rounded shadow">
                        <div className="flex flex-col gap-2">
                            {categories.map((cat) => (
                                <Link
                                    key={cat}
                                    href="#"
                                    className="text-gray-700 hover:text-[#29A653]"
                                >
                                    {cat}
                                </Link>
                            ))}
                            <Link
                                href="/plans"
                                className="text-[#E60600] hover:text-[#913330]"
                            >
                                Go Premium
                            </Link>
                            <span className="text-gray-600">Sign Up</span>
                            <button className="px-4 py-2 bg-[#29A653] text-white rounded hover:bg-[#01E64E]">
                                Log In
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
