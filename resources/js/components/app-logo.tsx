import { cn } from '@/lib/utils'; // Assuming cn is available, or use standard className

export default function AppLogo({ className }: { className?: string }) {
    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="flex aspect-square size-8 items-center justify-center overflow-hidden">
                <img src="/images/logo-icon.png" alt="NextGenStock Logo" className="size-full object-contain" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-bold tracking-tight text-foreground">
                    NextGenStock
                </span>
            </div>
        </div>
    );
}
