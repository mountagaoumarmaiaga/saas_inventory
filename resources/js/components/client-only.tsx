
import { useEffect, useState, ReactNode } from "react";

export default function ClientOnly({ children, fallback = null }: { children: ReactNode, fallback?: ReactNode }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return <span style={{ display: 'contents' }}>{fallback}</span>;
    }

    return <span style={{ display: 'contents' }}>{children}</span>;
}
