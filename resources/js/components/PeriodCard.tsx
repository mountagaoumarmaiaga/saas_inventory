import { LucideIcon } from 'lucide-react';

interface PeriodCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    className?: string;
    iconColor: string;
}

export default function PeriodCard({ title, value, icon: Icon, className, iconColor }: PeriodCardProps) {
    // Extract base color from iconColor class (simplified heuristic)
    const isIndigo = iconColor.includes('indigo');
    const isViolet = iconColor.includes('violet');
    const isEmerald = iconColor.includes('emerald');

    let borderColor = "border-border/50";
    if (isIndigo) borderColor = "border-indigo-100 dark:border-indigo-900/30 hover:border-indigo-200 dark:hover:border-indigo-800/50";
    if (isViolet) borderColor = "border-violet-100 dark:border-violet-900/30 hover:border-violet-200 dark:hover:border-violet-800/50";
    if (isEmerald) borderColor = "border-emerald-100 dark:border-emerald-900/30 hover:border-emerald-200 dark:hover:border-emerald-800/50";

    return (
        <div className={`relative overflow-hidden rounded-2xl border ${borderColor} p-6 bg-background/50 backdrop-blur-xl shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${className}`}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-semibold text-muted-foreground/90 tracking-wide uppercase">{title}</h3>
                    <div className={`p-2 rounded-xl bg-background/80 shadow-sm ${iconColor}`}>
                        <Icon className="h-4 w-4" />
                    </div>
                </div>
                <div className="flex items-baseline space-x-1">
                    <span className="text-2xl font-bold text-foreground tracking-tight">
                        {(() => {
                            const num = Number(value);
                            return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(isNaN(num) ? 0 : num);
                        })()}
                    </span>
                </div>
            </div>
        </div>
    );
}
