"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
    Building2,
    CheckCircle2,
    Clock,
    FileBadge,
    Mail,
    MapPin,
    MessageCircle,
    Phone,
    RotateCcw,
    Share2,
    ShieldCheck,
    Video,
} from "lucide-react";
import type { CollectionDef, FieldDef } from "@/lib/admin-schema";
import FieldInput from "./FieldInput";
import { PreviewShell, SectionCard } from "./SiteSettingsEditor";

type Doc = Record<string, unknown> & { _id?: string };
type Values = Record<string, unknown>;

/* Brand icons (lucide-react no longer ships brand icons — same SVGs as Footer.tsx) */
const FacebookIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
);
const InstagramIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
);
const TwitterIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
    </svg>
);
const YoutubeIcon = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} style={style}>
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

function str(v: unknown): string {
    return typeof v === "string" ? v : v === undefined || v === null ? "" : String(v);
}

function fieldByName(def: CollectionDef, name: string): FieldDef {
    const f = def.fields.find((x) => x.name === name);
    if (!f) throw new Error(`HospitalInfo field missing: ${name}`);
    return f;
}

interface Section {
    key: string;
    icon: typeof Building2;
    title: string;
    desc: string;
    fields: string[];
    preview: (values: Values) => ReactNode;
}

const SECTIONS: Section[] = [
    {
        key: "identity",
        icon: Building2,
        title: "Identity & Branding",
        desc: "Hospital name, subtitle and logo shown in the header and across the site",
        fields: ["name", "subtitle", "tagline", "regNo", "logo"],
        preview: (v) => <BrandPreview values={v} />,
    },
    {
        key: "contact",
        icon: Phone,
        title: "Contact & Location",
        desc: "Phone numbers, email, address, consultation hours and map link",
        fields: [
            "primaryPhone",
            "secondaryPhone",
            "emergencyPhone",
            "whatsapp",
            "email",
            "googleMapsUrl",
            "address",
            "timing",
        ],
        preview: (v) => <ContactPreview values={v} />,
    },
    {
        key: "social",
        icon: Share2,
        title: "Social Links",
        desc: "Social media icons shown in the footer (use # to hide a link)",
        fields: ["facebookUrl", "instagramUrl", "twitterUrl", "youtubeUrl"],
        preview: (v) => <SocialPreview values={v} />,
    },
    {
        key: "footer",
        icon: ShieldCheck,
        title: "Footer Content",
        desc: "About text and accreditation badge shown in the footer",
        fields: ["footerAbout", "footerAccreditation"],
        preview: (v) => <FooterPreview values={v} />,
    },
    {
        key: "media",
        icon: Video,
        title: "Section Media",
        desc: "Videos and images used by the About and Excellence sections",
        fields: [
            "aboutVideoMain",
            "aboutVideoSecondary",
            "aboutDoctorImage",
            "excellenceImage1",
            "excellenceImage2",
        ],
        preview: (v) => <MediaPreview values={v} />,
    },
];

export default function HospitalInfoEditor({
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
    const [values, setValues] = useState<Values>(() => {
        const base: Values = {};
        for (const f of def.fields) base[f.name] = str(doc?.[f.name]);
        return base;
    });
    const [snapshot, setSnapshot] = useState<Values>(() => ({ ...values }));
    const [justSaved, setJustSaved] = useState(false);

    const dirty = JSON.stringify(values) !== JSON.stringify(snapshot);

    function setValue(name: string, value: unknown) {
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    const handleSave = useCallback(async () => {
        const ok = await onSave(values, doc?._id);
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

            {SECTIONS.map((section) => (
                <SectionCard
                    key={section.key}
                    icon={section.icon}
                    title={section.title}
                    desc={section.desc}
                >
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 items-start">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {section.fields.map((name) => {
                                const f = fieldByName(def, name);
                                return (
                                    <div
                                        key={name}
                                        className={f.full ? "sm:col-span-2" : ""}
                                    >
                                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                                            {f.label}
                                            {f.required && (
                                                <span className="text-red-500 ml-0.5">*</span>
                                            )}
                                        </label>
                                        <FieldInput
                                            field={f}
                                            value={values[name]}
                                            onChange={(v) => setValue(name, v)}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        {section.preview(values)}
                    </div>
                </SectionCard>
            ))}
        </div>
    );
}

/* ---------------- Previews ---------------- */

function BrandPreview({ values }: { values: Values }) {
    const name = str(values.name) || "Hospital Name";
    const subtitle = str(values.subtitle) || "Hospital Tagline";
    const tagline = str(values.tagline);
    const regNo = str(values.regNo);
    const logo = str(values.logo);

    return (
        <PreviewShell label="Header brand — live preview">
            <div className="rounded-full bg-white border border-slate-200/60 shadow-sm px-4 py-2.5 flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-white ring-2 ring-slate-200 shadow-sm flex items-center justify-center overflow-hidden shrink-0 relative">
                    {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                            src={logo}
                            alt=""
                            className="absolute w-[280%] max-w-none h-auto left-1/2 -translate-x-1/2"
                            style={{ top: "-18%" }}
                        />
                    ) : (
                        <Building2 className="w-4 h-4 text-slate-300" />
                    )}
                </div>
                <div className="flex flex-col leading-none min-w-0">
                    <span className="text-sm font-black bg-clip-text text-transparent bg-gradient-to-r from-[#1e293b] to-[#588356] truncate">
                        {name}
                    </span>
                    <span className="text-[8px] font-extrabold uppercase tracking-[0.2em] text-[#588356] mt-1 truncate">
                        {subtitle}
                    </span>
                </div>
            </div>
            {(tagline || regNo) && (
                <div className="mt-3 space-y-1.5 text-xs">
                    {tagline && (
                        <p className="text-slate-600 font-semibold italic">“{tagline}”</p>
                    )}
                    {regNo && (
                        <p className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#4a6f49] bg-[#EBF5EA] rounded-full px-2.5 py-1">
                            <FileBadge className="w-3 h-3" /> {regNo}
                        </p>
                    )}
                </div>
            )}
        </PreviewShell>
    );
}

function ContactPreview({ values }: { values: Values }) {
    const rows: { icon: typeof Phone; label: string; text: string; strong?: boolean }[] = [
        {
            icon: MapPin,
            label: "Address",
            text: str(values.address),
        },
        {
            icon: Phone,
            label: "Emergency",
            text: str(values.emergencyPhone),
            strong: true,
        },
        {
            icon: Phone,
            label: "Primary",
            text: str(values.primaryPhone),
        },
        {
            icon: Phone,
            label: "Secondary",
            text: str(values.secondaryPhone),
        },
        {
            icon: Mail,
            label: "Email",
            text: str(values.email),
        },
        {
            icon: MessageCircle,
            label: "WhatsApp",
            text: str(values.whatsapp),
        },
    ];
    const timing = str(values.timing);
    const maps = str(values.googleMapsUrl);

    return (
        <PreviewShell label="Footer contact column — live preview">
            <div className="space-y-3">
                {rows.map(
                    (r) =>
                        r.text && (
                            <div key={r.label} className="flex items-start gap-2.5">
                                <r.icon className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">
                                        {r.label}
                                    </p>
                                    <p
                                        className={`text-xs leading-relaxed break-words ${r.strong
                                            ? "text-slate-950 font-black text-sm"
                                            : "text-slate-600 font-bold"
                                            }`}
                                    >
                                        {r.text}
                                    </p>
                                </div>
                            </div>
                        )
                )}
                {timing && (
                    <div className="pt-2 border-t border-slate-200">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                            <Clock className="w-3 h-3" /> OPD Consultation Hours
                        </p>
                        <p className="text-xs text-slate-900 mt-1 font-black">{timing}</p>
                    </div>
                )}
                {maps && (
                    <a
                        href={maps}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] font-bold text-[#4a6f49] hover:underline"
                    >
                        <MapPin className="w-3 h-3" /> View on Google Maps
                    </a>
                )}
            </div>
        </PreviewShell>
    );
}

function SocialPreview({ values }: { values: Values }) {
    const socials = [
        { icon: FacebookIcon, label: "Facebook", href: str(values.facebookUrl), color: "#1877F2" },
        { icon: InstagramIcon, label: "Instagram", href: str(values.instagramUrl), color: "#E4405F" },
        { icon: TwitterIcon, label: "Twitter / X", href: str(values.twitterUrl), color: "#1DA1F2" },
        { icon: YoutubeIcon, label: "YouTube", href: str(values.youtubeUrl), color: "#FF0000" },
    ];
    return (
        <PreviewShell label="Footer social icons — live preview">
            <div className="flex flex-wrap items-center gap-2.5">
                {socials.map((s) => {
                    const active = Boolean(s.href) && s.href !== "#";
                    return (
                        <div
                            key={s.label}
                            className={`flex items-center gap-2 rounded-full border px-3 py-2 ${active
                                ? "bg-white border-slate-200 shadow-sm"
                                : "bg-slate-100 border-slate-200 opacity-50"
                                }`}
                            title={active ? s.href : "Hidden (set to # or empty)"}
                        >
                            <s.icon
                                className="w-4 h-4"
                                style={{ color: active ? s.color : "#94a3b8" }}
                            />
                            <span className="text-[10px] font-bold text-slate-600">
                                {s.label}
                            </span>
                            {!active && (
                                <span className="text-[8px] font-bold uppercase text-slate-400">
                                    hidden
                                </span>
                            )}
                        </div>
                    );
                })}
            </div>
            <p className="text-[10px] text-slate-400 mt-3">
                Icons with “#” or empty are shown dimmed and won’t open anything.
            </p>
        </PreviewShell>
    );
}

function FooterPreview({ values }: { values: Values }) {
    const about = str(values.footerAbout);
    const accreditation = str(values.footerAccreditation);
    return (
        <PreviewShell label="Footer about column — live preview">
            <p className="text-slate-700 leading-loose text-xs font-semibold">
                {about || (
                    <span className="text-slate-400 italic">No about text yet</span>
                )}
            </p>
            {accreditation && (
                <div className="mt-3 inline-flex items-center gap-2 text-[#588356] font-black text-[10px] bg-[#EBF5EA] px-3 py-2 rounded-full shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                    <span>{accreditation}</span>
                </div>
            )}
        </PreviewShell>
    );
}

const MEDIA_LABELS: Record<string, string> = {
    aboutVideoMain: "About — Main Video",
    aboutVideoSecondary: "About — Secondary Video",
    aboutDoctorImage: "About — Doctor Image",
    excellenceImage1: "Excellence — Image 1",
    excellenceImage2: "Excellence — Image 2",
};

function MediaPreview({ values }: { values: Values }) {
    const entries = Object.entries(MEDIA_LABELS);
    return (
        <PreviewShell label="Section media — live preview">
            <div className="grid grid-cols-2 gap-3">
                {entries.map(([key, label]) => {
                    const url = str(values[key]);
                    const isVideo = /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(url);
                    return (
                        <div
                            key={key}
                            className="rounded-lg border border-slate-200 bg-white overflow-hidden"
                        >
                            <div className="aspect-video bg-slate-100 flex items-center justify-center">
                                {!url ? (
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-300">
                                        Empty
                                    </span>
                                ) : isVideo ? (
                                    <video
                                        src={url}
                                        className="h-full w-full object-cover"
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={url}
                                        alt={label}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <p className="text-[9px] font-bold text-slate-500 px-2 py-1.5 truncate">
                                {label}
                            </p>
                        </div>
                    );
                })}
            </div>
        </PreviewShell>
    );
}
