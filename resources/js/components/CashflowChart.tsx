import { useState, useEffect, useRef } from 'react';
import { ComposedChart, Line, Bar, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CashflowData {
    date: string;
    balance: number;
    in: number;
    out: number;
}

interface CashflowChartProps {
    data: CashflowData[];
}

export default function CashflowChart({ data }: CashflowChartProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Format date labels
    const formatDateLabel = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short' });
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
        ...item,
        label: formatDateLabel(item.date),
        fullDate: new Date(item.date).toLocaleDateString('fr-FR'),
    }));

    // Custom tooltip
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            const d = payload[0].payload;
            return (
                <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-4">
                    <p className="font-semibold text-foreground mb-3 pb-2 border-b border-border/50">
                        {d.fullDate}
                    </p>
                    <div className="space-y-2 text-sm">
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-emerald-500" /> Entrées prévues (Factures)
                            </span>
                            <span className="font-medium text-emerald-600">{formatCurrency(d.in)}</span>
                        </div>
                        <div className="flex items-center justify-between gap-6">
                            <span className="text-muted-foreground flex items-center gap-1.5">
                                <div className="w-2 h-2 rounded-full bg-red-500" /> Sorties prévues (Achats)
                            </span>
                            <span className="font-medium text-red-600">-{formatCurrency(d.out)}</span>
                        </div>
                        <div className="pt-2 mt-2 border-t border-border/50 flex items-center justify-between gap-6 font-bold">
                            <span className="text-foreground">Solde Estimé</span>
                            <span className={d.balance >= 0 ? "text-emerald-600" : "text-red-600"}>
                                {formatCurrency(d.balance)}
                            </span>
                        </div>
                    </div>
                </div>
            );
        }
        return null;
    };

    if (!mounted) return <div style={{ width: '100%', height: '100%', minHeight: '200px' }} />;

    return (
        <div style={{ width: '100%', height: '100%', minHeight: '200px' }}>
            {data && data.length > 0 && (
                <ResponsiveContainer width="99%" height="100%">
                    <ComposedChart
                        data={chartData}
                        margin={{ top: 20, right: 20, left: 10, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} opacity={0.5} />
                        <XAxis
                            dataKey="label"
                            stroke="#9ca3af"
                            tickLine={false}
                            axisLine={false}
                            tick={{ fontSize: 12 }}
                            dy={10}
                            minTickGap={20}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6', opacity: 0.4 }} />

                        {/* Zero baseline */}
                        <ReferenceLine y={0} stroke="#cbd5e1" strokeDasharray="3 3" />

                        {/* Bars for Cash IN */}
                        <Bar dataKey="in" fill="#34d399" radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.8} />

                        {/* Bars for Cash OUT */}
                        <Bar dataKey="out" fill="#fb7185" radius={[4, 4, 0, 0]} maxBarSize={40} opacity={0.8} />

                        {/* Line for cumulative balance */}
                        <Line
                            type="monotone"
                            dataKey="balance"
                            stroke="#3b82f6"
                            strokeWidth={3}
                            dot={{ r: 3, fill: '#3b82f6', strokeWidth: 0 }}
                            activeDot={{ r: 6, fill: '#3b82f6', stroke: '#fff', strokeWidth: 2 }}
                        />
                    </ComposedChart>
                </ResponsiveContainer>
            )}
        </div>
    );
}
