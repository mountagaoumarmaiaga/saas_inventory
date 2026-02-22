import { motion } from 'framer-motion';
import { LucideIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    isCurrency?: boolean;
    trend?: number; // Percentage change
    color?: 'default' | 'primary' | 'success' | 'warning' | 'info' | 'purple';
    subValue?: string;
    delay?: number;
    description?: string; // Added for User Dashboard compatibility
    gradient?: string; // Added for custom gradients
}

export default function StatCard({
    title,
    value,
    icon: Icon,
    isCurrency = false,
    trend,
    color = 'default',
    subValue,
    delay = 0,
    description,
    gradient
}: StatCardProps) {
    const safeValue = Number(value);
    const finalValue = isNaN(safeValue) ? 0 : safeValue;

    const formattedValue = isCurrency
        ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'XOF', maximumFractionDigits: 0 }).format(finalValue)
        : value;

    // Premium "Glass" Themes with Gradients
    const themes = {
        default: "from-background/50 to-muted/50 border-border/40 shadow-sm hover:shadow-md",
        primary: "from-primary/5 to-primary/10 border-primary/20 hover:border-primary/40 shadow-sm",
        success: "from-success/5 to-success/10 border-success/20 hover:border-success/40 shadow-sm",
        warning: "from-warning/5 to-warning/10 border-warning/20 hover:border-warning/40 shadow-sm",
        info: "from-blue-500/5 to-blue-500/10 border-blue-500/20 hover:border-blue-500/40 shadow-sm",
        purple: "from-purple-500/5 to-purple-500/10 border-purple-500/20 hover:border-purple-500/40 shadow-sm",
    };

    const iconThemes = {
        default: "bg-muted text-muted-foreground",
        primary: "bg-primary/20 text-primary",
        success: "bg-success/20 text-success",
        warning: "bg-warning/20 text-warning",
        info: "bg-blue-500/20 text-blue-500",
        purple: "bg-purple-500/20 text-purple-500",
    };

    const textGradients = {
        default: "text-foreground",
        primary: "text-foreground",
        success: "text-foreground",
        warning: "text-foreground",
        info: "text-foreground",
        purple: "text-foreground",
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: delay * 0.1 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border bg-gradient-to-br backdrop-blur-xl transition-all duration-300 hover:-translate-y-1",
                themes[color] || themes.default,
                gradient && `${gradient}`
            )}
        >
            {/* Glossy Reflection Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            <div className="p-6 relative z-10">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-bold text-muted-foreground/90 tracking-tight">{title}</p>
                        <div className="mt-2 flex items-baseline gap-2">
                            <span className={cn("text-2xl font-bold tracking-tight font-heading truncate", textGradients[color] || textGradients.default)} title={String(formattedValue)}>
                                {formattedValue}
                            </span>
                            {trend !== undefined && (
                                <span className={cn(
                                    "flex items-center text-xs font-medium px-1.5 py-0.5 rounded-full",
                                    trend >= 0
                                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                                        : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                                )}>
                                    {trend >= 0 ? <ArrowUpRight className="size-3 mr-1" /> : <ArrowDownRight className="size-3 mr-1" />}
                                    {Math.abs(trend)}%
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cn("h-10 w-10 rounded-xl flex items-center justify-center transition-colors", iconThemes[color] || iconThemes.default)}>
                        <Icon className="size-5" />
                    </div>
                </div>

                {(subValue || description) && (
                    <div className="mt-4 pt-4 border-t border-border/50">
                        {description ? (
                            <p className="text-xs text-muted-foreground mt-1">{description}</p>
                        ) : (
                            <p className="text-xs text-muted-foreground flex items-center gap-2">
                                <span className={cn("size-1.5 rounded-full animate-pulse", color === 'default' ? 'bg-muted-foreground' : `bg-${color === 'primary' ? 'primary' : color === 'success' ? 'success' : color === 'warning' ? 'warning' : 'blue-500'}`)} />
                                {subValue}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </motion.div>
    );
}
