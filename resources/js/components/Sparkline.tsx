import { useState, useEffect } from 'react';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface SparklineProps {
    data: number[];
    color?: string;
}

export default function Sparkline({ data, color = '#10b981' }: SparklineProps) {
    const [mounted, setMounted] = useState(false);
    useEffect(() => { setMounted(true); }, []);

    // Transform data into chart format
    const chartData = data.map((value, index) => ({ value, index }));

    if (!mounted) return <div style={{ width: '100%', height: '100%' }} />;

    return (
        <ResponsiveContainer width="100%" height="100%" minWidth={1} minHeight={1}>
            <LineChart data={chartData}>
                <Line
                    type="monotone"
                    dataKey="value"
                    stroke={color}
                    strokeWidth={2}
                    dot={false}
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
