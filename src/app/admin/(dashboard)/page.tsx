import Link from "next/link";
import { ADMIN_COLLECTIONS } from "@/lib/admin-schema";

export const dynamic = "force-dynamic";

export default function AdminDashboardPage() {
    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
                <p className="text-sm text-slate-500 mt-1">
                    Manage every piece of content on the website. Changes appear immediately
                    after saving.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {ADMIN_COLLECTIONS.map((c) => (
                    <Link
                        key={c.key}
                        href={`/admin/collections/${c.key}`}
                        className="group bg-white rounded-xl border border-slate-200 p-5 hover:border-[#588356] hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <h2 className="font-semibold text-slate-900 group-hover:text-[#4a6f49]">
                                {c.label}
                            </h2>
                            {c.singleton && (
                                <span className="text-[10px] font-semibold uppercase tracking-wide bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
                                    Single
                                </span>
                            )}
                        </div>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            {c.description}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    );
}
