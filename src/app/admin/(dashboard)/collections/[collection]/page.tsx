import { notFound } from "next/navigation";
import { getCollectionDef } from "@/lib/admin-schema";
import CollectionManager from "./CollectionManager";

export const dynamic = "force-dynamic";

export default async function CollectionPage({
    params,
}: {
    params: Promise<{ collection: string }>;
}) {
    const { collection } = await params;
    const def = getCollectionDef(collection);
    if (!def) notFound();

    return <CollectionManager def={def} />;
}
