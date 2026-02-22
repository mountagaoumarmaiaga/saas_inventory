import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PreviewProps {
    file?: File | null;
    url?: string | null;
    alt?: string;
    className?: string;
}

export function Preview({ file, url, alt = "Preview", className }: PreviewProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);

            // Cleanup function to revoke the object URL
            return () => URL.revokeObjectURL(objectUrl);
        } else if (url) {
            setPreviewUrl(url);
        } else {
            setPreviewUrl(null);
        }
    }, [file, url]);

    if (!previewUrl) {
        return null;
    }

    return (
        <div className={cn("relative overflow-hidden rounded-md border", className)}>
            <img
                src={previewUrl}
                alt={alt}
                className="h-full w-full object-cover"
            />
        </div>
    );
}
