"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function LoginForm({ logo }: { logo: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const res = await fetch("/api/admin/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, password }),
            });
            const json = await res.json();
            if (!res.ok) {
                setError(json.error || "Login failed");
                return;
            }
            const from = searchParams.get("from") || "/admin";
            router.push(from);
            router.refresh();
        } catch {
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
                    <div className="flex flex-col items-center mb-8">
                        {logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo} alt="Logo" className="h-14 w-auto mb-4" />
                        )}
                        <h1 className="text-xl font-bold text-slate-900">Admin Panel</h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Venkata Ganapathy Physiotherapy Clinic
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label
                                htmlFor="username"
                                className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5"
                            >
                                Username
                            </label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                                placeholder="admin"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="password"
                                className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                                placeholder="••••••••"
                            />
                        </div>

                        {error && (
                            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                                {error}
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-2.5 rounded-lg bg-[#588356] hover:bg-[#4a6f49] disabled:opacity-60 text-white font-semibold text-sm transition-colors"
                        >
                            {loading ? "Signing in…" : "Sign In"}
                        </button>
                    </form>
                </div>

                <p className="text-center text-xs text-slate-400 mt-6">
                    <a href="/" className="hover:text-slate-600">
                        ← Back to website
                    </a>
                </p>
            </div>
        </div>
    );
}
