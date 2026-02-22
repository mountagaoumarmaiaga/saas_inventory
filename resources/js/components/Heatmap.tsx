interface HeatmapData {
    day_of_week: number;
    hour: number;
    total: number;
}

interface HeatmapProps {
    data: HeatmapData[];
}

export default function Heatmap({ data }: HeatmapProps) {
    const days = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
    const hours = Array.from({ length: 24 }, (_, i) => i);

    // Find max value for color scaling
    const maxValue = Math.max(...data.map(d => Number(d.total)), 1);

    // Create a map for quick lookup
    const dataMap = new Map<string, number>();
    data.forEach(item => {
        const key = `${item.day_of_week}-${item.hour}`;
        dataMap.set(key, Number(item.total));
    });

    // Get color intensity based on value - Monochromatic Emerald Scale
    const getColor = (value: number) => {
        if (value === 0) return 'bg-gray-100 dark:bg-gray-800/50';
        const intensity = value / maxValue;
        if (intensity > 0.8) return 'bg-emerald-600';
        if (intensity > 0.6) return 'bg-emerald-500';
        if (intensity > 0.4) return 'bg-emerald-400';
        if (intensity > 0.2) return 'bg-emerald-300';
        return 'bg-emerald-200';
    };

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    return (
        <div className="w-full overflow-x-auto pb-2">
            <div className="min-w-[800px]">
                {/* Header */}
                <div className="flex mb-3">
                    <div className="w-12"></div>
                    {hours.map(hour => (
                        <div key={hour} className="flex-1 text-center text-xs font-medium text-muted-foreground">
                            {hour}h
                        </div>
                    ))}
                </div>

                {/* Heatmap grid */}
                <div className="space-y-1.5">
                    {days.map((day, dayIndex) => (
                        <div key={dayIndex} className="flex">
                            <div className="w-12 flex items-center text-xs font-medium text-muted-foreground">
                                {day}
                            </div>
                            {hours.map(hour => {
                                const key = `${dayIndex}-${hour}`;
                                const value = dataMap.get(key) || 0;
                                return (
                                    <div
                                        key={hour}
                                        className={`flex-1 h-8 mx-0.5 rounded-sm ${getColor(value)} transition-all duration-200 hover:ring-2 hover:ring-emerald-500 hover:scale-105 cursor-pointer group relative`}
                                    >
                                        {/* Custom Tooltip */}
                                        <div className="hidden group-hover:block absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 min-w-[120px]">
                                            <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-2 text-center">
                                                <p className="text-xs font-medium text-muted-foreground mb-1">{day} À {hour}h00</p>
                                                <p className="text-sm font-bold text-emerald-500">{formatCurrency(value)}</p>
                                            </div>
                                            {/* Arrow */}
                                            <div className="w-2 h-2 bg-background border-r border-b border-border transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>

                {/* Legend */}
                <div className="flex items-center justify-end gap-3 mt-6 text-xs text-muted-foreground">
                    <span>Faible</span>
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 bg-gray-100 dark:bg-gray-800/50 rounded-sm"></div>
                        <div className="w-3 h-3 bg-emerald-200 rounded-sm"></div>
                        <div className="w-3 h-3 bg-emerald-300 rounded-sm"></div>
                        <div className="w-3 h-3 bg-emerald-400 rounded-sm"></div>
                        <div className="w-3 h-3 bg-emerald-500 rounded-sm"></div>
                        <div className="w-3 h-3 bg-emerald-600 rounded-sm"></div>
                    </div>
                    <span>Élevé</span>
                </div>
            </div>
        </div>
    );
}
