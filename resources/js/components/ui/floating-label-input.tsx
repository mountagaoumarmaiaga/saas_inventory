import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

interface FloatingLabelInputProps extends React.ComponentProps<typeof Input> {
    label: string;
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
    ({ label, className, ...props }, ref) => {
        return (
            <div className="relative group">
                <Input
                    {...props}
                    ref={ref}
                    className={cn(
                        "peer pt-6 pb-2 px-3 h-14 bg-muted/20 border-border/50 focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-transparent",
                        className
                    )}
                    placeholder={label} // Required for :placeholder-shown trick
                />
                <label
                    htmlFor={props.id}
                    className="absolute left-3 top-4 text-muted-foreground text-sm transition-all pointer-events-none
            peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-muted-foreground/50
            peer-focus:top-1.5 peer-focus:text-xs peer-focus:text-primary peer-focus:font-medium
            peer-[&:not(:placeholder-shown)]:top-1.5 peer-[&:not(:placeholder-shown)]:text-xs peer-[&:not(:placeholder-shown)]:text-muted-foreground"
                >
                    {label}
                </label>
            </div>
        );
    }
);
FloatingLabelInput.displayName = 'FloatingLabelInput';

export default FloatingLabelInput;
