import { ReactNode, useEffect, useState, useRef } from 'react';
import { Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChartContainerProps {
    title?: string;
    icon?: any;
    children: ReactNode;
    height?: number | string;
    className?: string;
    loading?: boolean;
    error?: string | null;
    onRetry?: () => void;
}

export default function ChartContainer({
    title,
    icon: Icon,
    children,
    height = 300,
    className = "",
    loading = false,
    error = null,
    onRetry
}: ChartContainerProps) {
    const [hasDimensions, setHasDimensions] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const resizeObserver = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
                    setHasDimensions(true);
                }
            }
        });

        resizeObserver.observe(containerRef.current);

        return () => {
            resizeObserver.disconnect();
        };
    }, []);

    // Container style for strict dimensions
    const containerStyle = {
        height: typeof height === 'number' ? `${height}px` : height,
        minHeight: typeof height === 'number' ? `${height}px` : height,
    };

    return (
        <div
            className={`rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 bg-gradient-to-br from-white/60 to-white/30 dark:from-zinc-900/60 dark:to-zinc-950/30 backdrop-blur-sm shadow-sm flex flex-col overflow-hidden relative ${className}`}
            style={containerStyle}
        >
            {/* Header */}
            {(title || Icon) && (
                <div className="px-6 py-4 flex-none border-b border-white/5">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            {title && <h3 className="text-lg font-semibold leading-none tracking-tight">{title}</h3>}
                        </div>
                        {Icon && (
                            <div className="p-2 bg-muted/50 rounded-lg text-muted-foreground/70">
                                <Icon className="h-4 w-4" />
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Content Area */}
            <div className="flex-1 w-full min-h-0 relative p-4" ref={containerRef}>
                <AnimatePresence mode="wait">
                    {/* Loading State */}
                    {(!hasDimensions || loading) && (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-[1px] z-10"
                        >
                            <div className="flex flex-col items-center gap-2 text-muted-foreground/70">
                                <Loader2 className="h-6 w-6 animate-spin text-orange-500" />
                            </div>
                        </motion.div>
                    )}

                    {/* Error State */}
                    {hasDimensions && !loading && error && (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 flex items-center justify-center p-6"
                        >
                            <div className="flex flex-col items-center gap-3 text-red-500 max-w-[80%] text-center">
                                <AlertCircle className="h-8 w-8 opacity-80" />
                                <div className="space-y-1">
                                    <p className="text-sm font-semibold">Erreur</p>
                                    <p className="text-xs opacity-80">{error}</p>
                                </div>
                                {onRetry && (
                                    <button
                                        onClick={onRetry}
                                        className="mt-2 text-xs flex items-center gap-1.5 px-3 py-1.5 bg-background rounded-md shadow-sm border hover:bg-accent transition-colors"
                                    >
                                        <RefreshCw className="h-3 w-3" />
                                        Réessayer
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Chart Content */}
                    {hasDimensions && !loading && !error && (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="w-full h-full"
                        >
                            {/* Recharts wrapper */}
                            <div style={{ width: '100%', height: '100%' }}>
                                {children}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
