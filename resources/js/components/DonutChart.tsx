import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface RevenueData {
    client_name: string;
    total: number;
}

interface DonutChartProps {
    data: RevenueData[];
}

const COLORS = ['#f97316', '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

export default function DonutChart({ data }: DonutChartProps) {
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
    const CustomTooltip = ({ active, payload }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-background/95 backdrop-blur-md border border-border rounded-lg shadow-xl p-3">
                    <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: payload[0].fill }} />
                        <p className="text-sm font-medium text-foreground">
                            {payload[0].payload.client_name}
                        </p>
                    </div>
                    <p className="text-lg font-bold text-foreground">
                        {formatCurrency(payload[0].value)}
                    </p>
                </div>
            );
        }
        return null;
    };

    // Transform data for pie chart
    const chartData = data.map((item) => ({
        name: item.client_name,
        value: Number(item.total), // Ensure value is a number
        client_name: item.client_name,
    }));

    if (!mounted) return <div style={{ width: '100%', height: '100%' }} />;

    return (
        <ResponsiveContainer width="100%" height="100%" debounce={50} minWidth={1} minHeight={1}>
            <PieChart>
                <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    cornerRadius={5}
                >
                    {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                    ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
                <Legend
                    verticalAlign="bottom"
                    height={36}
                    iconType="circle"
                    formatter={(value) => <span className="text-xs font-medium text-muted-foreground ml-1">{value}</span>}
                />
            </PieChart>
        </ResponsiveContainer>
    );
}
