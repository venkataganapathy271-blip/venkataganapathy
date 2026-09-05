"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CollectionDef, FieldDef } from "@/lib/admin-schema";
import FieldInput from "./FieldInput";
import SiteSettingsEditor from "./SiteSettingsEditor";
import HospitalInfoEditor from "./HospitalInfoEditor";

type Doc = Record<string, unknown> & { _id?: string };

export default function CollectionManager({ def }: { def: CollectionDef }) {
    const [docs, setDocs] = useState<Doc[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [editing, setEditing] = useState<Doc | null>(null); // null = closed, {} = new
    const [search, setSearch] = useState("");

    const isEditing = editing !== null;

    const load = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`/api/admin/${def.key}`, { cache: "no-store" });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Failed to load");
            const data = json.data;
            setDocs(Array.isArray(data) ? data : data ? [data] : []);
        } catch (e) {
            setError(e instanceof Error ? e.message : "Failed to load");
        } finally {
            setLoading(false);
        }
    }, [def.key]);

    useEffect(() => {
        load();
    }, [load]);

    const filtered = useMemo(() => {
        if (!search.trim()) return docs;
        const q = search.toLowerCase();
        return docs.filter((d) =>
            Object.values(d).some(
                (v) => typeof v === "string" && v.toLowerCase().includes(q)
            )
        );
    }, [docs, search]);

    async function handleDelete(doc: Doc) {
        if (!doc._id) return;
        if (!confirm(`Delete "${String(doc[def.titleField] ?? "this item")}"? This cannot be undone.`)) {
            return;
        }
        try {
            const res = await fetch(`/api/admin/${def.key}/${doc._id}`, {
                method: "DELETE",
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Delete failed");
            setDocs((prev) => prev.filter((d) => d._id !== doc._id));
        } catch (e) {
            alert(e instanceof Error ? e.message : "Delete failed");
        }
    }

    async function handleSave(
        values: Record<string, unknown>,
        id?: string
    ): Promise<boolean> {
        setSaving(true);
        try {
            const url = id
                ? `/api/admin/${def.key}/${id}`
                : `/api/admin/${def.key}`;
            const res = await fetch(url, {
                method: id ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error || "Save failed");
            await load();
            setEditing(null);
            return true;
        } catch (e) {
            alert(e instanceof Error ? e.message : "Save failed");
            return false;
        } finally {
            setSaving(false);
        }
    }

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">{def.label}</h1>
                    <p className="text-sm text-slate-500 mt-0.5">{def.description}</p>
                </div>
                <div className="flex items-center gap-2">
                    {!def.singleton && (
                        <input
                            type="search"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search…"
                            className="px-3 py-2 rounded-lg border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#588356] focus:border-[#588356]"
                        />
                    )}
                    {def.key !== "siteSettings" && def.key !== "hospitalInfo" && (
                        <button
                            onClick={() => setEditing({})}
                            className="px-4 py-2 rounded-lg bg-[#588356] hover:bg-[#4a6f49] text-white text-sm font-semibold transition-colors"
                        >
                            {def.singleton ? "Edit" : "+ Add New"}
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2.5">
                    {error}
                </p>
            )}

            {loading ? (
                <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
                    Loading…
                </div>
            ) : isEditing ? (
                <DocumentForm
                    def={def}
                    initial={editing}
                    saving={saving}
                    onCancel={() => setEditing(null)}
                    onSave={handleSave}
                />
            ) : def.key === "siteSettings" ? (
                <SiteSettingsEditor
                    def={def}
                    doc={docs[0]}
                    saving={saving}
                    onSave={handleSave}
                />
            ) : def.key === "hospitalInfo" ? (
                <HospitalInfoEditor
                    def={def}
                    doc={docs[0]}
                    saving={saving}
                    onSave={handleSave}
                />
            ) : def.singleton ? (
                <SingletonView def={def} doc={docs[0]} onEdit={() => setEditing(docs[0] ?? {})} />
            ) : (
                <DocumentsTable
                    def={def}
                    docs={filtered}
                    onEdit={(d) => setEditing(d)}
                    onDelete={handleDelete}
                />
            )}
        </div>
    );
}

/* ---------------- Singleton view ---------------- */

function SingletonView({
    def,
    doc,
    onEdit,
}: {
    def: CollectionDef;
    doc?: Doc;
    onEdit: () => void;
}) {
    if (!doc) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center">
                <p className="text-sm text-slate-500 mb-4">No document found.</p>
                <button
                    onClick={onEdit}
                    className="px-4 py-2 rounded-lg bg-[#588356] hover:bg-[#4a6f49] text-white text-sm font-semibold"
                >
                    Create now
                </button>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {def.fields.map((f) => (
                    <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                        <dt className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                            {f.label}
                        </dt>
                        <dd className="text-sm text-slate-800 mt-0.5 break-words">
                            <PreviewValue field={f} value={doc[f.name]} />
                        </dd>
                    </div>
                ))}
            </dl>
            <button
                onClick={onEdit}
                className="mt-6 px-4 py-2 rounded-lg bg-[#588356] hover:bg-[#4a6f49] text-white text-sm font-semibold transition-colors"
            >
                Edit
            </button>
        </div>
    );
}

function PreviewValue({ field, value }: { field: FieldDef; value: unknown }) {
    if (value === undefined || value === null || value === "") {
        return <span className="text-slate-400">—</span>;
    }
    if (field.type === "media" && typeof value === "string") {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={value}
                alt=""
                className="h-16 w-16 object-cover rounded-lg border border-slate-200"
            />
        );
    }
    if (field.type === "boolean") {
        return <span>{value ? "Yes" : "No"}</span>;
    }
    if (field.type === "list" && Array.isArray(value)) {
        return <span>{value.join(", ")}</span>;
    }
    if (field.type === "string-list" && Array.isArray(value)) {
        return <span>{value.join(", ")}</span>;
    }
    if (field.type === "object-list" && Array.isArray(value)) {
        if (value.length === 0) {
            return <span className="text-slate-400">—</span>;
        }
        return (
            <ul className="space-y-1">
                {value.map((row, i) => (
                    <li
                        key={i}
                        className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 inline-flex flex-wrap gap-x-2"
                    >
                        {field.subFields?.map((sf) => (
                            <span key={sf.name} className="text-slate-600">
                                <span className="text-slate-400">{sf.label}:</span>{" "}
                                {String(
                                    (row as Record<string, unknown>)?.[sf.name] ?? "—"
                                )}
                            </span>
                        ))}
                    </li>
                ))}
            </ul>
        );
    }
    if (field.type === "json") {
        return (
            <code className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 block max-h-32 overflow-auto">
                {JSON.stringify(value, null, 2)}
            </code>
        );
    }
    if (typeof value === "object") {
        return (
            <code className="text-xs bg-slate-50 border border-slate-200 rounded px-2 py-1 block max-h-32 overflow-auto">
                {JSON.stringify(value, null, 2)}
            </code>
        );
    }
    return <span>{String(value)}</span>;
}

/* ---------------- Table view ---------------- */

function DocumentsTable({
    def,
    docs,
    onEdit,
    onDelete,
}: {
    def: CollectionDef;
    docs: Doc[];
    onEdit: (d: Doc) => void;
    onDelete: (d: Doc) => void;
}) {
    const hasOrderField = def.fields.some(f => f.name === "order");
    if (docs.length === 0) {
        return (
            <div className="bg-white rounded-xl border border-slate-200 p-10 text-center text-sm text-slate-500">
                No items yet. Click “+ Add New” to create one.
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-left text-[11px] uppercase tracking-wide text-slate-500">
                        <th className="px-4 py-3 font-semibold">Preview</th>
                        <th className="px-4 py-3 font-semibold">Title</th>
                        <th className="px-4 py-3 font-semibold">Details</th>
                        {hasOrderField && <th className="px-4 py-3 font-semibold">Order</th>}
                        <th className="px-4 py-3 font-semibold text-right">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {docs.map((doc) => (
                        <tr key={String(doc._id)} className="border-b border-slate-100 last:border-0 hover:bg-slate-50">
                            <td className="px-4 py-3">
                                {def.imageField && typeof doc[def.imageField] === "string" && doc[def.imageField] ? (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={String(doc[def.imageField])}
                                        alt=""
                                        className="h-12 w-12 object-cover rounded-lg border border-slate-200"
                                    />
                                ) : (
                                    <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200" />
                                )}
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-900 max-w-xs truncate">
                                {String(doc[def.titleField] ?? "—")}
                            </td>
                            <td className="px-4 py-3 text-slate-500 max-w-md">
                                {def.key === "enquiries" ? (
                                    <div className="flex flex-col gap-1 text-xs">
                                        {doc.phone ? <span>Phone: {String(doc.phone)}</span> : null}
                                        {doc.email ? <span>Email: {String(doc.email)}</span> : null}
                                        {doc.department ? <span>Dept: {String(doc.department)}</span> : null}
                                        {doc.preferredDate ? <span>Date: {String(doc.preferredDate)}</span> : null}
                                        {doc.message ? <span className="truncate max-w-[250px]" title={String(doc.message)}>Message: {String(doc.message)}</span> : null}
                                    </div>
                                ) : (
                                    def.subtitleField ? String(doc[def.subtitleField] ?? "") : ""
                                )}
                            </td>
                            {hasOrderField && (
                                <td className="px-4 py-3 text-slate-500">
                                    {typeof doc.order === "number" ? doc.order : "—"}
                                </td>
                            )}
                            <td className="px-4 py-3 text-right whitespace-nowrap">
                                <button
                                    onClick={() => onEdit(doc)}
                                    className="px-3 py-1.5 rounded-md text-xs font-semibold text-[#4a6f49] hover:bg-[#588356]/10 transition-colors"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => onDelete(doc)}
                                    className="px-3 py-1.5 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors ml-1"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/* ---------------- Form ---------------- */

function DocumentForm({
    def,
    initial,
    saving,
    onCancel,
    onSave,
}: {
    def: CollectionDef;
    initial: Doc;
    saving: boolean;
    onCancel: () => void;
    onSave: (values: Record<string, unknown>, id?: string) => void;
}) {
    const [values, setValues] = useState<Record<string, unknown>>(() => {
        const base: Record<string, unknown> = {};
        for (const f of def.fields) {
            base[f.name] = initial[f.name] ?? defaultFor(f);
        }
        return base;
    });

    function setValue(name: string, value: unknown) {
        setValues((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSave(values, initial._id);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-slate-200 p-6 space-y-5"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {def.fields.map((f) => (
                    <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                        <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600 mb-1.5">
                            {f.label}
                            {f.required && <span className="text-red-500 ml-0.5">*</span>}
                        </label>
                        <FieldInput field={f} value={values[f.name]} onChange={(v) => setValue(f.name, v)} />
                        {f.help && <p className="text-[11px] text-slate-400 mt-1">{f.help}</p>}
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 rounded-lg bg-[#588356] hover:bg-[#4a6f49] disabled:opacity-60 text-white text-sm font-semibold transition-colors"
                >
                    {saving ? "Saving…" : initial._id ? "Save Changes" : "Create"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-5 py-2.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-sm font-semibold transition-colors"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
}

function defaultFor(f: FieldDef): unknown {
    switch (f.type) {
        case "number":
            return 0;
        case "boolean":
            return false;
        case "list":
            return [];
        case "select":
            return f.options?.[0] ?? "";
        case "json":
        case "string-list":
        case "object-list":
            return [];
        default:
            return "";
    }
}
