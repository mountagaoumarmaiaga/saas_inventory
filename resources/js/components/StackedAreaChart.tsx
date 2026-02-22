import { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface RevenueByStatus {
    date: string;
    PAID: number;
    PENDING: number;
    SENT: number;
}

interface StackedAreaChartProps {
    data: RevenueByStatus[];
}

export default function StackedAreaChart({ data }: StackedAreaChartProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Format currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: 'XOF',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value);
    };

    // Custom tooltip
    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-3">
                    <p className="text-sm font-medium text-muted-foreground mb-3">
                        {new Date(label).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </p>
                    {payload.map((entry: any, index: number) => (
                        <div key={index} className="flex items-center justify-between gap-6 mb-1">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }} />
                                <span className="text-sm font-medium text-foreground">
                                    {entry.name === 'PAID' ? 'Payé' : entry.name === 'PENDING' ? 'En attente' : 'Envoyé'}
                                </span>
                            </div>
                            <span className="text-sm font-bold text-foreground">
                                {formatCurrency(entry.value)}
                            </span>
                        </div>
                    ))}
                </div>
            );
        }
        return null;
    };

    if (!mounted) return <div style={{ width: '100%', height: '100%' }} />;

    return (
        <ResponsiveContainer width="100%" height="100%" debounce={50} minWidth={1} minHeight={1}>
            <AreaChart
                data={data.map(d => ({
                    ...d,
                    PAID: Number(d.PAID),
                    PENDING: Number(d.PENDING),
                    SENT: Number(d.SENT)
                }))}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
                <defs>
                    <linearGradient id="colorPaid" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorPending" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorSent" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey="date" hide />
                <Tooltip content={<CustomTooltip />} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="SENT" stackId="1" stroke="#3b82f6" fill="url(#colorSent)" name="Envoyé" />
                <Area type="monotone" dataKey="PENDING" stackId="1" stroke="#f59e0b" fill="url(#colorPending)" name="En attente" />
                <Area type="monotone" dataKey="PAID" stackId="1" stroke="#10b981" fill="url(#colorPaid)" name="Payé" />
            </AreaChart>
        </ResponsiveContainer>
    );
}
