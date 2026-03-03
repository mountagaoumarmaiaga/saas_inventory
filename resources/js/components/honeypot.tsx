import React, { useEffect } from 'react';
import { usePage } from '@inertiajs/react';

interface HoneypotProps {
    setData: (key: string, value: string) => void;
}

export function Honeypot({ setData }: HoneypotProps) {
    const { props } = usePage<any>();
    const honeypot = props.honeypot;

    useEffect(() => {
        if (honeypot && honeypot.enabled) {
            setData(honeypot.nameFieldName, '');
            setData(honeypot.validFromFieldName, honeypot.encryptedValidFrom);
        }
    }, [honeypot]);

    if (!honeypot || !honeypot.enabled) {
        return null;
    }

    return (
        <div style={{ display: 'none' }} aria-hidden="true">
            <input
                type="text"
                name={honeypot.nameFieldName}
                id={honeypot.nameFieldName}
                onChange={(e) => setData(honeypot.nameFieldName, e.target.value)}
                tabIndex={-1}
                autoComplete="off"
            />
            <input
                type="text"
                name={honeypot.validFromFieldName}
                defaultValue={honeypot.encryptedValidFrom}
                tabIndex={-1}
                autoComplete="off"
            />
        </div>
    );
}
