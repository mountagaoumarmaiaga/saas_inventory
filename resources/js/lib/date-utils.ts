
export interface DateGroupedItems<T> {
    label: string;
    items: T[];
}

export function groupItemsByDate<T>(
    items: T[],
    dateField: keyof T | ((item: T) => string)
): DateGroupedItems<T>[] {
    const groups: Record<string, T[]> = {};
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();

    // We maintain insertion order for keys in simple object iteration in modern JS/Browsers 
    // if keys are string, but to be safe and sort correctly we might need more logic.
    // However, if the input 'items' is already sorted by date DESC, processing them in order
    // will create groups in the correct order (most recent first).

    items.forEach(item => {
        let dateVal: string;
        if (typeof dateField === 'function') {
            dateVal = dateField(item);
        } else {
            dateVal = item[dateField] as unknown as string;
        }

        if (!dateVal) return; // Skip if no date

        const d = new Date(dateVal);
        const dStr = d.toDateString();

        let label = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        // Capitalize first letter
        label = label.charAt(0).toUpperCase() + label.slice(1);

        if (dStr === today) label = "Aujourd'hui";
        else if (dStr === yesterday) label = "Hier";

        if (!groups[label]) {
            groups[label] = [];
        }
        groups[label].push(item);
    });

    // Extract to array. 
    // Since we iterated sorted items, the groups encountered should be in order.
    // But Object.keys might not guarantee order of integer-like keys (not the case here) or insertion order in older envs.
    // Map would be safer for insertion order, but let's just assume we want to rely on the input order.
    // Actually, iterating the keys of 'groups' will usually follow insertion order for string keys.
    // Let's optimize: build the array directly.

    const result: DateGroupedItems<T>[] = [];
    const knownLabels = new Map<string, DateGroupedItems<T>>();

    items.forEach(item => {
        let dateVal: string;
        if (typeof dateField === 'function') {
            dateVal = dateField(item);
        } else {
            dateVal = item[dateField] as unknown as string;
        }

        if (!dateVal) return;

        const d = new Date(dateVal);
        const dStr = d.toDateString();

        let label = d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
        label = label.charAt(0).toUpperCase() + label.slice(1);

        if (dStr === today) label = "Aujourd'hui";
        else if (dStr === yesterday) label = "Hier";

        if (!knownLabels.has(label)) {
            const group = { label, items: [] };
            knownLabels.set(label, group);
            result.push(group);
        }
        knownLabels.get(label)!.items.push(item);
    });

    return result;
}
