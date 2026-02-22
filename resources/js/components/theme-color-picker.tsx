import { ThemeColor, useThemeColor } from '@/hooks/use-theme-color';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { HTMLAttributes } from 'react';

export default function ThemeColorPicker({
    className = '',
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    const { themeColor, updateThemeColor } = useThemeColor();

    const colors: { value: ThemeColor; label: string; bgClass: string }[] = [
        { value: 'orange', label: 'Orange', bgClass: 'bg-[#ee7621]' }, // SaaS Orange
        { value: 'blue', label: 'Blue', bgClass: 'bg-blue-600' },
        { value: 'green', label: 'Green', bgClass: 'bg-green-600' },
        { value: 'purple', label: 'Purple', bgClass: 'bg-purple-600' },
        { value: 'rose', label: 'Rose', bgClass: 'bg-rose-600' },
        { value: 'zinc', label: 'Zinc', bgClass: 'bg-zinc-900 dark:bg-zinc-100' },
    ];

    return (
        <div className={cn('flex flex-wrap gap-3', className)} {...props}>
            {colors.map(({ value, label, bgClass }) => {
                const isActive = themeColor === value;
                return (
                    <button
                        key={value}
                        onClick={() => updateThemeColor(value)}
                        title={label}
                        className={cn(
                            'flex h-10 w-10 items-center justify-center rounded-full transition-all duration-200 outline-none hover:scale-110 active:scale-95 shadow-sm',
                            bgClass,
                            isActive
                                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background'
                                : 'ring-1 ring-border/50 hover:ring-2 hover:ring-border'
                        )}
                        aria-label={`Sélecteur de couleur ${label}`}
                        aria-pressed={isActive}
                    >
                        {isActive && (
                            <Check className={cn("h-5 w-5", value === 'zinc' ? "text-white dark:text-zinc-900" : "text-white")} />
                        )}
                    </button>
                );
            })}
        </div>
    );
}
