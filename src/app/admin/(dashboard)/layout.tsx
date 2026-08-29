import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getHospitalInfo } from "@/lib/data";
import AdminShell from "./AdminShell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Admin — Venkata Ganapathy Physiotherapy Clinic",
    robots: { index: false, follow: false },
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getAdminSession();
    if (!session) {
        redirect("/admin/login");
    }

    const hospitalInfo = await getHospitalInfo();

    return (
        <AdminShell username={session.username} logo={hospitalInfo.logo}>
            {children}
        </AdminShell>
    );
}
