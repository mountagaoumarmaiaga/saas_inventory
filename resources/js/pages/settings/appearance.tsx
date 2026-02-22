import { Head } from '@inertiajs/react';

import AppearanceTabs from '@/components/appearance-tabs';
import ThemeColorPicker from '@/components/theme-color-picker';
import HeadingSmall from '@/components/heading-small';
import { type BreadcrumbItem } from '@/types';

import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Appearance settings',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appearance settings" />

            <h1 className="sr-only">Appearance Settings</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Appearance settings"
                        description="Update your account's appearance settings"
                    />
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm font-medium text-foreground block mb-3">Theme Mode</span>
                            <AppearanceTabs />
                        </div>

                        <div className="pt-4 border-t border-border">
                            <span className="text-sm font-medium text-foreground block mb-3">Accent Color</span>
                            <ThemeColorPicker />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
