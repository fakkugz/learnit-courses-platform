'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const setUser = useAuthStore((state) => state.setUser);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            credentials: 'include',
        });

        if (res.ok) {
            // Obtener datos del usuario
            const userRes = await fetch('/api/me');
            if (userRes.ok) {
                const data = await userRes.json();
                setUser(data.user);
            }
            router.push('/profile');
        } else {
            const data = await res.json();
            setError(data.message || 'Login failed');
        }
    };

    return (
        <main className="flex items-center justify-center min-h-[calc(100vh-64px)] bg-gray-50 px-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-strong border border-primary-400">
                <h2 className="text-3xl font-bold text-primary-400 text-center">Sign in to your account</h2>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Email */}
                    <div>
                        {error && <p className="text-red-500">{error}</p>}
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-200 focus:border-primary-200 focus:outline-none"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                        <div className="relative mt-1">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                autoComplete="current-password"
                                required
                                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-primary-200 focus:border-primary-200 focus:outline-none pr-10"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
                                tabIndex={-1}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-primary-300 text-white font-semibold rounded-lg hover:bg-primary-200 transition-colors cursor-pointer"
                        >
                            Sign In
                        </button>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center text-sm text-gray-600">
                    Don’t have an account?{' '}
                    <Link href="/signup" className="text-secondary-100 hover:underline">
                        Sign up
                    </Link>
                </div>
            </div>
        </main>
    );
}
