"use client";

import { useRef, useState } from "react";
import type { FieldDef, ObjectListSubField } from "@/lib/admin-schema";

export default function FieldInput({
    field,
    value,
    onChange,
}: {
    field: FieldDef;
    value: unknown;
    onChange: (value: unknown) => void;
}) {
    switch (field.type) {
        case "textarea":
            return (
                <textarea
                    value={String(value ?? "")}
                    onChange={(e) => onChange(e.target.value)}
                    rows={3}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm resize-y"
                />
            );
        case "number":
            return (
                <input
                    type="number"
                    value={value === undefined || value === null ? "" : Number(value)}
                    onChange={(e) => onChange(e.target.value === "" ? 0 : Number(e.target.value))}
                    step="any"
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                />
            );
        case "boolean":
            return (
                <label className="inline-flex items-center gap-2.5 cursor-pointer select-none py-2">
                    <input
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(e) => onChange(e.target.checked)}
                        className="h-4 w-4 accent-[#588356]"
                    />
                    <span className="text-sm text-slate-600">{field.label}</span>
                </label>
            );
        case "select":
            return (
                <select
                    value={String(value ?? "")}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm bg-white"
                >
                    {field.options?.map((opt) => (
                        <option key={opt} value={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            );
        case "list":
            return (
                <ListInput
                    value={Array.isArray(value) ? value : []}
                    onChange={onChange}
                    placeholder={field.placeholder}
                />
            );
        case "json":
            return (
                <JsonInput value={value} onChange={onChange} />
            );
        case "string-list":
            return (
                <StringListInput
                    value={Array.isArray(value) ? value.map(String) : []}
                    onChange={onChange}
                    placeholder={field.placeholder}
                />
            );
        case "object-list":
            return (
                <ObjectListInput
                    value={Array.isArray(value) ? value : []}
                    onChange={onChange}
                    subFields={field.subFields ?? []}
                />
            );
        case "media":
            return (
                <MediaInput
                    value={String(value ?? "")}
                    onChange={onChange}
                    label={field.label}
                />
            );
        default:
            return (
                <input
                    type="text"
                    value={String(value ?? "")}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={field.placeholder}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                />
            );
    }
}

/* ---------------- List (one item per line) ---------------- */

function ListInput({
    value,
    onChange,
    placeholder,
}: {
    value: string[];
    onChange: (value: unknown) => void;
    placeholder?: string;
}) {
    return (
        <textarea
            value={value.join("\n")}
            onChange={(e) => onChange(e.target.value.split("\n"))}
            rows={4}
            placeholder={placeholder || "One item per line"}
            className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm resize-y font-mono text-xs"
        />
    );
}

/* ---------------- JSON ---------------- */

function JsonInput({
    value,
    onChange,
}: {
    value: unknown;
    onChange: (value: unknown) => void;
}) {
    const [text, setText] = useState(() => JSON.stringify(value ?? [], null, 2));
    const [error, setError] = useState<string | null>(null);

    function handleChange(next: string) {
        setText(next);
        try {
            const parsed = JSON.parse(next);
            setError(null);
            onChange(parsed);
        } catch {
            setError("Invalid JSON — changes not saved until fixed");
        }
    }

    return (
        <div>
            <textarea
                value={text}
                onChange={(e) => handleChange(e.target.value)}
                rows={6}
                spellCheck={false}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-xs font-mono resize-y"
            />
            {error && <p className="text-[11px] text-red-500 mt-1">{error}</p>}
        </div>
    );
}

/* ---------------- String List (visual rows) ---------------- */

export function StringListInput({
    value,
    onChange,
    placeholder,
}: {
    value: string[];
    onChange: (value: unknown) => void;
    placeholder?: string;
}) {
    function update(idx: number, next: string) {
        const copy = [...value];
        copy[idx] = next;
        onChange(copy);
    }
    function remove(idx: number) {
        onChange(value.filter((_, i) => i !== idx));
    }
    function add() {
        onChange([...value, ""]);
    }
    function move(idx: number, dir: -1 | 1) {
        const target = idx + dir;
        if (target < 0 || target >= value.length) return;
        const copy = [...value];
        [copy[idx], copy[target]] = [copy[target], copy[idx]];
        onChange(copy);
    }

    return (
        <div className="space-y-2">
            {value.length === 0 && (
                <p className="text-xs text-slate-400 italic">No items yet — click "Add Item" below.</p>
            )}
            {value.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-slate-400 w-6 text-center shrink-0">{idx + 1}</span>
                    <input
                        type="text"
                        value={item}
                        onChange={(e) => update(idx, e.target.value)}
                        placeholder={placeholder || "Enter text"}
                        className="flex-1 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                    />
                    <div className="flex items-center gap-1 shrink-0">
                        <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} title="Move up"
                            className="h-8 w-8 rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs">↑</button>
                        <button type="button" onClick={() => move(idx, 1)} disabled={idx === value.length - 1} title="Move down"
                            className="h-8 w-8 rounded-lg border border-slate-300 text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs">↓</button>
                        <button type="button" onClick={() => remove(idx)} title="Remove"
                            className="h-8 w-8 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 text-xs">✕</button>
                    </div>
                </div>
            ))}
            <button type="button" onClick={add}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#588356] text-[#588356] text-xs font-bold hover:bg-[#588356]/5">
                + Add Item
            </button>
        </div>
    );
}

/* ---------------- Object List (visual rows with sub-fields) ---------------- */

export function ObjectListInput({
    value,
    onChange,
    subFields,
}: {
    value: Record<string, unknown>[];
    onChange: (value: unknown) => void;
    subFields: ObjectListSubField[];
}) {
    function update(idx: number, key: string, next: string) {
        const copy = value.map((row) => ({ ...row }));
        copy[idx] = { ...copy[idx], [key]: next };
        onChange(copy);
    }
    function remove(idx: number) {
        onChange(value.filter((_, i) => i !== idx));
    }
    function add() {
        const empty: Record<string, unknown> = {};
        for (const sf of subFields) empty[sf.name] = "";
        onChange([...value, empty]);
    }
    function move(idx: number, dir: -1 | 1) {
        const target = idx + dir;
        if (target < 0 || target >= value.length) return;
        const copy = value.map((row) => ({ ...row }));
        [copy[idx], copy[target]] = [copy[target], copy[idx]];
        onChange(copy);
    }

    return (
        <div className="space-y-3">
            {value.length === 0 && (
                <p className="text-xs text-slate-400 italic">No items yet — click "Add Item" below.</p>
            )}
            {value.map((row, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">Item {idx + 1}</span>
                        <div className="flex items-center gap-1">
                            <button type="button" onClick={() => move(idx, -1)} disabled={idx === 0} title="Move up"
                                className="h-7 w-7 rounded-lg border border-slate-300 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs">↑</button>
                            <button type="button" onClick={() => move(idx, 1)} disabled={idx === value.length - 1} title="Move down"
                                className="h-7 w-7 rounded-lg border border-slate-300 bg-white text-slate-500 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed text-xs">↓</button>
                            <button type="button" onClick={() => remove(idx)} title="Remove"
                                className="h-7 w-7 rounded-lg border border-red-200 bg-white text-red-500 hover:bg-red-50 text-xs">✕</button>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {subFields.map((sf) => (
                            <label key={sf.name} className={`flex flex-col gap-1 min-w-[140px] ${sf.width ?? "flex-1"}`}>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide">{sf.label}</span>
                                {sf.multiline ? (
                                    <textarea
                                        value={String(row[sf.name] ?? "")}
                                        onChange={(e) => update(idx, sf.name, e.target.value)}
                                        placeholder={sf.placeholder}
                                        rows={6}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm leading-relaxed"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={String(row[sf.name] ?? "")}
                                        onChange={(e) => update(idx, sf.name, e.target.value)}
                                        placeholder={sf.placeholder}
                                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-sm"
                                    />
                                )}
                            </label>
                        ))}
                    </div>
                </div>
            ))}
            <button type="button" onClick={add}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[#588356] text-[#588356] text-xs font-bold hover:bg-[#588356]/5">
                + Add Item
            </button>
        </div>
    );
}

/* ---------------- Media (Cloudinary upload) ---------------- */

function MediaInput({
    value,
    onChange,
    label,
}: {
    value: string;
    onChange: (value: unknown) => void;
    label: string;
}) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    const isVideo = /\.(mp4|webm|mov|avi|mkv)(\?|$)/i.test(value);
    const isCloudinary = value.includes("res.cloudinary.com");

    async function handleFile(file: File) {
        setUploading(true);
        setError(null);
        setProgress(10);
        try {
            // 1. Get signature to bypass Vercel's 4.5MB payload limit
            const subfolder = labelToSubfolder(label);
            const signRes = await fetch(`/api/admin/upload?subfolder=${encodeURIComponent(subfolder)}`);
            const signData = await signRes.json();
            if (!signRes.ok) throw new Error(signData.error || "Failed to get upload signature");
            
            setProgress(30);

            // 2. Upload directly to Cloudinary
            const formData = new FormData();
            formData.append("file", file);
            formData.append("api_key", signData.apiKey);
            formData.append("timestamp", String(signData.timestamp));
            formData.append("signature", signData.signature);
            formData.append("folder", signData.folder);

            const uploadRes = await fetch(
                `https://api.cloudinary.com/v1_1/${signData.cloudName}/auto/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            
            setProgress(80);
            const uploadData = await uploadRes.json();
            if (!uploadRes.ok) throw new Error(uploadData.error?.message || "Upload failed");
            
            onChange(uploadData.secure_url);
            setProgress(100);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Upload failed");
        } finally {
            setUploading(false);
            setTimeout(() => setProgress(0), 600);
        }
    }

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-2">
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFile(file);
                        e.target.value = "";
                    }}
                />
                <button
                    type="button"
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="px-3.5 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 disabled:opacity-60 text-xs font-semibold text-slate-700 transition-colors whitespace-nowrap"
                >
                    {uploading ? "Uploading…" : "⬆ Upload"}
                </button>
                <input
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder="https://res.cloudinary.com/… or /path"
                    className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356] text-xs"
                />
            </div>

            {uploading && (
                <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-[#588356] transition-all duration-300"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {error && <p className="text-[11px] text-red-500">{error}</p>}

            {value && (
                <div className="flex items-center gap-3">
                    <div className="h-16 w-16 rounded-lg border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center shrink-0">
                        {isVideo ? (
                            <video src={value} className="h-full w-full object-cover" muted />
                        ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={value} alt="" className="h-full w-full object-cover" />
                        )}
                    </div>
                    <div className="text-[11px] text-slate-400 break-all">
                        {isCloudinary ? "☁ Cloudinary" : "Local path"}
                    </div>
                </div>
            )}
        </div>
    );
}

function labelToSubfolder(label: string): string {
    return label
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
}
