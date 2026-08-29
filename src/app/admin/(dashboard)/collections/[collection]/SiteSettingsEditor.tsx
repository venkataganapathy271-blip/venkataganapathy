"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
    Activity,
    ArrowRight,
    CheckCircle2,
    ChevronRight,
    ClipboardList,
    Link2,
    List,
    Menu,
    RotateCcw,
} from "lucide-react";
import type { CollectionDef, FieldDef } from "@/lib/admin-schema";
import { ObjectListInput, StringListInput } from "./FieldInput";

type Doc = Record<string, unknown> & { _id?: string };

type NavLink = { name: string; href: string };
type FooterLink = { label: string; href: string };
type DeptOption = { value: string; label: string };

type SiteSettingsValues = {
    navLinks: NavLink[];
    footerQuickLinks: FooterLink[];
    footerDepartments: string[];
    enquiryDepartments: DeptOption[];
};

/** Same defaults as the mongoose schema, used when no document exists yet */
const DEFAULT_VALUES: SiteSettingsValues = {
    navLinks: [
        { name: "Home", href: "#home" },
        { name: "About", href: "#about" },
        { name: "Services", href: "#departments" },
        { name: "Doctors", href: "#doctors" },
        { name: "Facilities", href: "#facilities" },
        { name: "Gallery", href: "#gallery" },
        { name: "FAQs", href: "#faq" },
        { name: "Contact", href: "#contact" },
    ],
    footerQuickLinks: [
        { label: "Home", href: "#home" },
        { label: "About Hospital", href: "#about" },
        { label: "Departments", href: "#departments" },
        { label: "Our Doctors", href: "#doctors" },
        { label: "Facilities", href: "#facilities" },
        { label: "Patient Reviews", href: "#testimonials" },
        { label: "Book Consultation", href: "#contact" },
    ],
    footerDepartments: [
        "Orthopedic & Joint Rehab",
        "Spine & Slipped Disc Decompression",
        "Neurological Paralysis Rehab",
        "Sports Injury & Performance",
        "Post-Surgical Mobility Care",
        "Pediatric & Geriatric Therapy",
        "High-Intensity Laser Therapy (HILT)",
        "Digital Gait Analysis Studio",
    ],
    enquiryDepartments: [
        { value: "orthopedic-rehab", label: "Orthopedic Rehabilitation" },
        { value: "spine-joint", label: "Spine & Sciatica Care" },
        { value: "neuro-rehab", label: "Neurological & Stroke Rehab" },
        { value: "sports-injury", label: "Sports Injury Clinic" },
        { value: "post-surgery", label: "Post-Surgical Care" },
        { value: "pediatric-geriatric", label: "Pediatric & Geriatric Therapy" },
    ],
};

function cloneDefaults(): SiteSettingsValues {
    return JSON.parse(JSON.stringify(DEFAULT_VALUES)) as SiteSettingsValues;
}

function initValues(doc?: Doc | null): SiteSettingsValues {
    if (!doc) return cloneDefaults();
    return {
        navLinks: Array.isArray(doc.navLinks) ? (doc.navLinks as NavLink[]) : [],
        footerQuickLinks: Array.isArray(doc.footerQuickLinks)
            ? (doc.footerQuickLinks as FooterLink[])
            : [],
        footerDepartments: Array.isArray(doc.footerDepartments)
            ? doc.footerDepartments.map(String)
            : [],
        enquiryDepartments: Array.isArray(doc.enquiryDepartments)
            ? (doc.enquiryDepartments as DeptOption[])
            : [],
    };
}

interface HospitalPreview {
    name: string;
    subtitle: string;
    logo: string;
}

const FALLBACK_HOSPITAL: HospitalPreview = {
    name: "Hospital Name",
    subtitle: "Hospital Tagline",
    logo: "",
};

function fieldByName(def: CollectionDef, name: string, fallback: FieldDef): FieldDef {
    return def.fields.find((f) => f.name === name) ?? fallback;
}

export default function SiteSettingsEditor({
    def,
    doc,
    saving,
    onSave,
}: {
    def: CollectionDef;
    doc?: Doc;
    saving: boolean;
    onSave: (values: Record<string, unknown>, id?: string) => Promise<boolean>;
}) {
    const [values, setValues] = useState<SiteSettingsValues>(() => initValues(doc));
    const [snapshot, setSnapshot] = useState<SiteSettingsValues>(() => initValues(doc));
    const [hospital, setHospital] = useState<HospitalPreview>(FALLBACK_HOSPITAL);
    const [justSaved, setJustSaved] = useState(false);

    /* Fetch hospital info once so previews show the real brand */
    useEffect(() => {
        let cancelled = false;
        (async () => {
            try {
                const res = await fetch("/api/admin/hospitalInfo", { cache: "no-store" });
                if (!res.ok) return;
                const json = await res.json();
                const d = json.data;
                if (!d || cancelled) return;
                setHospital({
                    name: String(d.name ?? FALLBACK_HOSPITAL.name),
                    subtitle: String(d.subtitle ?? FALLBACK_HOSPITAL.subtitle),
                    logo: String(d.logo ?? ""),
                });
            } catch {
                /* preview falls back to placeholders */
            }
        })();
        return () => {
            cancelled = true;
        };
    }, []);

    const dirty = JSON.stringify(values) !== JSON.stringify(snapshot);

    function setField<K extends keyof SiteSettingsValues>(key: K, next: SiteSettingsValues[K]) {
        setValues((prev) => ({ ...prev, [key]: next }));
    }

    const handleSave = useCallback(async () => {
        const ok = await onSave(
            values as unknown as Record<string, unknown>,
            doc?._id
        );
        if (ok) {
            setSnapshot(values);
            setJustSaved(true);
            setTimeout(() => setJustSaved(false), 2000);
        }
    }, [values, doc, onSave]);

    /* Ctrl/Cmd + S */
    useEffect(() => {
        function onKey(e: KeyboardEvent) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "s") {
                e.preventDefault();
                if (dirty && !saving) handleSave();
            }
        }
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [dirty, saving, handleSave]);

    const navField = fieldByName(def, "navLinks", {
        name: "navLinks",
        label: "Nav Links",
        type: "object-list",
        subFields: [
            { name: "name", label: "Menu Name", width: "flex-1" },
            { name: "href", label: "Link (section)", width: "flex-1" },
        ],
    });
    const quickLinksField = fieldByName(def, "footerQuickLinks", {
        name: "footerQuickLinks",
        label: "Footer Quick Links",
        type: "object-list",
        subFields: [
            { name: "label", label: "Link Text", width: "flex-1" },
            { name: "href", label: "Link (section)", width: "flex-1" },
        ],
    });
    const departmentsField = fieldByName(def, "footerDepartments", {
        name: "footerDepartments",
        label: "Footer Departments",
        type: "string-list",
    });
    const enquiryField = fieldByName(def, "enquiryDepartments", {
        name: "enquiryDepartments",
        label: "Enquiry Departments",
        type: "object-list",
        subFields: [
            { name: "value", label: "Value (internal)", width: "w-44" },
            { name: "label", label: "Shown Text", width: "flex-1" },
        ],
    });

    return (
        <div className="space-y-5">
            {/* Save bar */}
            <div className="sticky top-0 z-20 bg-white/95 backdrop-blur border border-slate-200 rounded-xl px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-semibold">
                    {justSaved ? (
                        <span className="inline-flex items-center gap-1.5 text-[#4a6f49]">
                            <CheckCircle2 className="w-4 h-4" /> All changes saved
                        </span>
                    ) : dirty ? (
                        <span className="inline-flex items-center gap-1.5 text-amber-600">
                            <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                            Unsaved changes
                        </span>
                    ) : (
                        <span className="text-slate-400">All changes saved</span>
                    )}
                </div>
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setValues(snapshot)}
                        disabled={!dirty || saving}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-slate-700 text-sm font-semibold transition-colors"
                    >
                        <RotateCcw className="w-3.5 h-3.5" /> Reset
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || (Boolean(doc) && !dirty)}
                        className="px-5 py-2 rounded-lg bg-[#588356] hover:bg-[#4a6f49] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                    >
                        {saving ? "Saving…" : justSaved ? "✓ Saved" : "Save Changes"}
                    </button>
                </div>
            </div>

            {/* Header navigation */}
            <SectionCard
                icon={Menu}
                title="Header Navigation"
                desc="Links shown in the top menu bar of every page"
                count={values.navLinks.length}
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                    <ObjectListInput
                        value={values.navLinks}
                        onChange={(v) => setField("navLinks", v as NavLink[])}
                        subFields={navField.subFields ?? []}
                    />
                    <HeaderPreview links={values.navLinks} hospital={hospital} />
                </div>
            </SectionCard>

            {/* Footer quick links */}
            <SectionCard
                icon={Link2}
                title="Footer Quick Links"
                desc="Links shown in the “Quick Links” column of the footer"
                count={values.footerQuickLinks.length}
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                    <ObjectListInput
                        value={values.footerQuickLinks}
                        onChange={(v) => setField("footerQuickLinks", v as FooterLink[])}
                        subFields={quickLinksField.subFields ?? []}
                    />
                    <FooterLinksPreview links={values.footerQuickLinks} />
                </div>
            </SectionCard>

            {/* Footer departments */}
            <SectionCard
                icon={List}
                title="Footer Departments"
                desc="Department names shown in the “Clinical Departments” column of the footer"
                count={values.footerDepartments.length}
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                    <StringListInput
                        value={values.footerDepartments}
                        onChange={(v) => setField("footerDepartments", v as string[])}
                        placeholder={departmentsField.placeholder ?? "e.g. Orthopedic & Joint Rehab"}
                    />
                    <DepartmentsPreview departments={values.footerDepartments} />
                </div>
            </SectionCard>

            {/* Enquiry form departments */}
            <SectionCard
                icon={ClipboardList}
                title="Appointment Form Departments"
                desc="Options in the department dropdown of the appointment enquiry form"
                count={values.enquiryDepartments.length}
            >
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                    <ObjectListInput
                        value={values.enquiryDepartments}
                        onChange={(v) => setField("enquiryDepartments", v as DeptOption[])}
                        subFields={enquiryField.subFields ?? []}
                    />
                    <EnquiryOptionsPreview options={values.enquiryDepartments} />
                </div>
            </SectionCard>
        </div>
    );
}

/* ---------------- Section shell ---------------- */

export function SectionCard({
    icon: Icon,
    title,
    desc,
    count,
    children,
}: {
    icon: typeof Menu;
    title: string;
    desc: string;
    count?: number;
    children: ReactNode;
}) {
    return (
        <section className="bg-white rounded-xl border border-slate-200 p-5">
            <div className="flex items-start gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-[#EBF5EA] text-[#4a6f49] flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                </div>
                <div>
                    <h2 className="font-semibold text-slate-900 flex items-center gap-2">
                        {title}
                        {count !== undefined && (
                            <span className="text-[10px] font-bold bg-slate-100 text-slate-500 rounded-full px-2 py-0.5">
                                {count} item{count === 1 ? "" : "s"}
                            </span>
                        )}
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">{desc}</p>
                </div>
            </div>
            {children}
        </section>
    );
}

export function PreviewShell({ label, children }: { label: string; children: ReactNode }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-[#FAFAFE] p-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                {label}
            </p>
            {children}
        </div>
    );
}

function EmptyRow({ text }: { text: string }) {
    return <li className="text-xs text-slate-400 italic">{text}</li>;
}

/* ---------------- Previews ---------------- */

function HeaderPreview({
    links,
    hospital,
}: {
    links: NavLink[];
    hospital: HospitalPreview;
}) {
    return (
        <div className="rounded-xl bg-gradient-to-br from-slate-900 via-[#2f4a2e] to-[#588356] p-4">
            <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-3">
                Header — live preview
            </p>
            <div className="flex items-center justify-between gap-3 bg-white/95 backdrop-blur rounded-full border border-slate-200/60 shadow-lg px-4 py-2.5">
                <div className="flex items-center gap-2 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-white ring-1 ring-slate-200 flex items-center justify-center overflow-hidden shrink-0">
                        {hospital.logo ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={hospital.logo}
                                alt=""
                                className="w-[280%] max-w-none h-auto left-1/2 relative"
                            />
                        ) : (
                            <Activity className="w-4 h-4 text-[#588356]" />
                        )}
                    </div>
                    <div className="flex flex-col leading-none min-w-0">
                        <span className="text-[11px] font-black text-slate-900 truncate">
                            {hospital.name}
                        </span>
                        <span className="text-[7px] font-extrabold uppercase tracking-[0.2em] text-[#588356] mt-0.5 truncate">
                            {hospital.subtitle}
                        </span>
                    </div>
                </div>
                <nav className="hidden sm:flex items-center flex-wrap justify-end gap-x-3 gap-y-1 text-[8px] font-bold uppercase tracking-wider text-slate-700 min-w-0">
                    {links.length === 0 ? (
                        <span className="text-slate-400 normal-case">No links yet</span>
                    ) : (
                        links.map((l, i) => (
                            <span
                                key={i}
                                className="hover:text-[#588356] transition-colors cursor-default truncate"
                                title={l.href}
                            >
                                {l.name || "Untitled"}
                            </span>
                        ))
                    )}
                </nav>
                <span className="hidden md:inline-flex items-center gap-1 bg-slate-900 text-white rounded-full px-3 py-1.5 text-[7px] font-bold uppercase tracking-widest shrink-0">
                    Book Appointment
                    <ArrowRight className="w-2.5 h-2.5" />
                </span>
            </div>
        </div>
    );
}

function FooterLinksPreview({ links }: { links: FooterLink[] }) {
    return (
        <PreviewShell label="Footer — Quick Links column (live preview)">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Quick Links
            </h4>
            <ul className="space-y-2.5 mt-3">
                {links.length === 0 && <EmptyRow text="No links yet — add some on the left" />}
                {links.map((l, i) => (
                    <li key={i} className="flex items-center text-sm font-bold text-slate-600">
                        <ChevronRight className="w-3 h-3 mr-2 text-slate-300 stroke-[3] shrink-0" />
                        <span className="truncate">{l.label || "Untitled"}</span>
                        {l.href && (
                            <code className="ml-2 text-[9px] text-slate-400 bg-white border border-slate-200 rounded-full px-1.5 py-0.5 shrink-0">
                                {l.href}
                            </code>
                        )}
                    </li>
                ))}
            </ul>
        </PreviewShell>
    );
}

function DepartmentsPreview({ departments }: { departments: string[] }) {
    return (
        <PreviewShell label="Footer — Clinical Departments column (live preview)">
            <h4 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">
                Clinical Departments
            </h4>
            <ul className="space-y-2.5 mt-3">
                {departments.length === 0 && (
                    <EmptyRow text="No departments yet — add some on the left" />
                )}
                {departments.map((d, i) => (
                    <li
                        key={i}
                        className="flex items-center text-sm font-bold text-slate-600"
                    >
                        <ChevronRight className="w-3 h-3 mr-2 text-slate-300 stroke-[3] shrink-0" />
                        <span className="truncate">{d || "Untitled"}</span>
                    </li>
                ))}
            </ul>
        </PreviewShell>
    );
}

function EnquiryOptionsPreview({ options }: { options: DeptOption[] }) {
    return (
        <PreviewShell label="Appointment form — Department dropdown (live preview)">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1.5">
                Select Department
            </label>
            <select
                disabled
                defaultValue=""
                className="w-full px-3 py-2.5 rounded-lg border border-slate-300 text-sm bg-white text-slate-700 cursor-not-allowed"
            >
                {options.length === 0 ? (
                    <option>No departments yet</option>
                ) : (
                    options.map((o, i) => (
                        <option key={i}>{o.label || o.value || `Option ${i + 1}`}</option>
                    ))
                )}
            </select>
            <div className="mt-3 flex flex-wrap gap-1.5">
                {options.map((o, i) =>
                    o.value ? (
                        <code
                            key={i}
                            className="text-[9px] bg-white border border-slate-200 rounded-full px-2 py-0.5 text-slate-500"
                        >
                            {o.value}
                        </code>
                    ) : null
                )}
            </div>
        </PreviewShell>
    );
}
