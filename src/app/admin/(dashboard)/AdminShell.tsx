"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ADMIN_COLLECTIONS } from "@/lib/admin-schema";

export default function AdminShell({
    username,
    logo,
    children,
}: {
    username: string;
    logo: string;
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    async function handleLogout() {
        await fetch("/api/admin/auth/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
    }

    return (
        <div className="h-screen bg-slate-100 flex overflow-hidden">
            {/* Sidebar */}
            <aside className="w-60 shrink-0 bg-slate-900 text-slate-300 flex flex-col">
                <div className="px-5 py-5 border-b border-slate-800">
                    <Link href="/admin" className="flex items-center gap-2.5">
                        {logo && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                        )}
                        <div className="leading-tight">
                            <p className="text-white font-bold text-sm">VG Admin</p>
                            <p className="text-[10px] text-slate-500 uppercase tracking-wide">
                                Control Panel
                            </p>
                        </div>
                    </Link>
                </div>

                <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                    <SidebarLink href="/admin" label="Dashboard" active={pathname === "/admin"} />

                    <p className="px-3 pt-4 pb-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                        Content
                    </p>
                    {ADMIN_COLLECTIONS.map((c) => {
                        const href = `/admin/collections/${c.key}`;
                        const active = pathname === href;
                        return <SidebarLink key={c.key} href={href} label={c.label} active={active} />;
                    })}
                </nav>

                <div className="px-3 py-4 border-t border-slate-800 space-y-1">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="block px-3 py-2 rounded-lg text-xs font-medium hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        ↗ View Website
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-red-400 hover:bg-slate-800 hover:text-red-300 transition-colors"
                    >
                        Sign out ({username})
                    </button>
                </div>
            </aside>

            {/* Main */}
            <main className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden">
                <div className="p-6 lg:p-8">{children}</div>
            </main>
        </div>
    );
}

function SidebarLink({
    href,
    label,
    active,
}: {
    href: string;
    label: string;
    active: boolean;
}) {
    return (
        <Link
            href={href}
            className={`block px-3 py-2 rounded-lg text-xs font-medium transition-colors ${active
                ? "bg-[#588356] text-white"
                : "hover:bg-slate-800 hover:text-white"
                }`}
        >
            {label}
        </Link>
    );
}
