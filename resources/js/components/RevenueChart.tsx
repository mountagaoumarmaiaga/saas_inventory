import { useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DailyRevenue {
    date: string;
    revenue: number;
}

interface RevenueChartProps {
    data: DailyRevenue[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Format date labels
    const formatDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date().toDateString();
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const dStr = date.toDateString();

        if (dStr === today) return "Aujourd'hui";
        if (dStr === yesterday) return "Hier";

        const weekdays = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
        return weekdays[date.getDay()];
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

    // Transform data for chart
    const chartData = data.map((item) => ({
        date: item.date,
        label: formatDateLabel(item.date),
        fullDate: new Date(item.date).toLocaleDateString('fr-FR'),
        revenue: item.revenue,
    }));

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-3">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                        {payload[0].payload.label} - {payload[0].payload.fullDate}
                    </p>
                    <p className="text-2xl font-bold text-orange-500">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    if (!mounted) return <div style={{ width: '100%', height: '100%' }} />;

    return (
        <ResponsiveContainer width="100%" height="100%" debounce={50} minWidth={1} minHeight={1}>
            <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f97316" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#f97316" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.5} />
                <XAxis
                    dataKey="label"
                    stroke="#9ca3af"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fontSize: 12 }}
                    dy={10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#f97316', strokeWidth: 1, strokeDasharray: '4 4' }} />
                <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#f97316"
                    strokeWidth={3}
                    fillOpacity={1}
                    fill="url(#colorRevenue)"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}
