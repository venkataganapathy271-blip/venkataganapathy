import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { getHospitalInfo } from "@/lib/data";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
    title: "Admin Login — Venkata Ganapathy Physiotherapy Clinic",
    robots: { index: false, follow: false },
};

export default async function AdminLoginPage() {
    const session = await getAdminSession();
    if (session) {
        redirect("/admin");
    }

    const hospitalInfo = await getHospitalInfo();

    return (
        <Suspense>
            <LoginForm logo={hospitalInfo.logo} />
        </Suspense>
    );
}
