import { Check, X } from "lucide-react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
    password: string;
}

export default function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
    const requirements = useMemo(() => {
        return [
            { label: "8 caractères minimum", valid: password.length >= 8 },
            { label: "Une majuscule", valid: /[A-Z]/.test(password) },
            { label: "Un chiffre", valid: /[0-9]/.test(password) },
            { label: "Un caractère spécial", valid: /[^A-Za-z0-9]/.test(password) },
        ];
    }, [password]);

    const strength = requirements.filter((r) => r.valid).length;

    const getStrengthColor = (s: number) => {
        if (s === 0) return "bg-border";
        if (s <= 1) return "bg-red-500";
        if (s <= 2) return "bg-orange-500";
        if (s === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthLabel = (s: number) => {
        if (s === 0) return "Entrez un mot de passe";
        if (s <= 2) return "Faible";
        if (s === 3) return "Moyen";
        return "Fort";
    };

    return (
        <div className="space-y-3">
            {/* Bars */}
            <div className="flex gap-1 h-1.5 w-full">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className={cn(
                            "h-full flex-1 rounded-full transition-all duration-300",
                            i <= strength ? getStrengthColor(strength) : "bg-muted"
                        )}
                    />
                ))}
            </div>

            {/* Label */}
            <div className="flex justify-between items-center text-xs">
                <span className="text-muted-foreground">Force du mot de passe</span>
                <span className={cn("font-medium", {
                    "text-red-500": strength <= 1 && strength > 0,
                    "text-orange-500": strength === 2,
                    "text-yellow-500": strength === 3,
                    "text-green-500": strength === 4,
                })}>
                    {getStrengthLabel(strength)}
                </span>
            </div>

            {/* Requirements List */}
            <div className="space-y-1.5">
                {requirements.map((req, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs">
                        {req.valid ? (
                            <Check className="size-3.5 text-green-500" />
                        ) : (
                            <div className="size-3.5 flex items-center justify-center">
                                <div className="size-1 rounded-full bg-muted-foreground/30" />
                            </div>
                        )}
                        <span className={cn(req.valid ? "text-foreground" : "text-muted-foreground")}>
                            {req.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
