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
        title: 'Paramètres d\'apparence',
        href: editAppearance().url,
    },
];

export default function Appearance() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paramètres d'apparence" />

            <h1 className="sr-only">Paramètres d'apparence</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Apparence"
                        description="Personnalisez le thème et les couleurs de l'interface"
                    />
                    <div className="space-y-4">
                        <div>
                            <span className="text-sm font-medium text-foreground block mb-3">Mode de thème</span>
                            <AppearanceTabs />
                        </div>

                        <div className="pt-4 border-t border-border">
                            <span className="text-sm font-medium text-foreground block mb-3">Couleur d'accentuation</span>
                            <ThemeColorPicker />
                        </div>
                    </div>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}
