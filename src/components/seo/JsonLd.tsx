/**
 * Renders schema.org structured data as a JSON-LD script tag.
 * Invisible to users; consumed by Google and other crawlers.
 */
export default function JsonLd({ data }: { data: unknown }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(data).replace(/</g, "\\u003c"),
            }}
        />
    );
}
