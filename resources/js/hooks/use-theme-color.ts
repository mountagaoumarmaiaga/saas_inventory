import { useCallback, useMemo, useSyncExternalStore } from 'react';

export type ThemeColor = 'orange' | 'blue' | 'green' | 'purple' | 'rose' | 'zinc';

const listeners = new Set<() => void>();
let currentThemeColor: ThemeColor = 'orange'; // Default to orange

const setCookie = (name: string, value: string, days = 365): void => {
    if (typeof document === 'undefined') return;
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${value};path=/;max-age=${maxAge};SameSite=Lax`;
};

const getStoredThemeColor = (): ThemeColor => {
    if (typeof window === 'undefined') return 'orange';
    const stored = localStorage.getItem('theme-color') as ThemeColor;
    return stored || 'orange';
};

const applyThemeColor = (color: ThemeColor): void => {
    if (typeof document === 'undefined') return;

    const root = document.documentElement;
    // Remove any existing theme-color class
    root.classList.forEach((cls) => {
        if (cls.startsWith('theme-')) {
            root.classList.remove(cls);
        }
    });

    // We don't need a specific class for orange since it's the CSS variable default
    if (color !== 'orange') {
        root.classList.add(`theme-${color}`);
    }
};

const subscribe = (callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
};

const notify = (): void => listeners.forEach((listener) => listener());

export function initializeThemeColor(): void {
    if (typeof window === 'undefined') return;

    if (!localStorage.getItem('theme-color')) {
        localStorage.setItem('theme-color', 'orange');
        setCookie('theme-color', 'orange');
    }

    currentThemeColor = getStoredThemeColor();
    applyThemeColor(currentThemeColor);
}

export function useThemeColor() {
    const themeColor: ThemeColor = useSyncExternalStore(
        subscribe,
        () => currentThemeColor,
        () => 'orange',
    );

    const updateThemeColor = useCallback((color: ThemeColor): void => {
        currentThemeColor = color;

        // Store in localStorage for client-side persistence
        localStorage.setItem('theme-color', color);

        // Store in cookie for SSR
        setCookie('theme-color', color);

        applyThemeColor(color);
        notify();
    }, []);

    return { themeColor, updateThemeColor } as const;
}
