import './bootstrap';
import '../css/app.css';
import 'react-toastify/dist/ReactToastify.css';
import { route } from 'ziggy-js';

// Expose Ziggy route helper globally
(window as any).route = route;

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';
import { initializeThemeColor } from './hooks/use-theme-color';
import { ToastContainer, Slide } from 'react-toastify';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        if (!el) {
            console.error('Mount element not found');
            return;
        }

        // Nettoyer l'élément
        while (el.firstChild) {
            el.removeChild(el.firstChild);
        }

        const root = createRoot(el);

        root.render(
            <>
                <App {...props} />
                <ToastContainer
                    position="bottom-right"
                    autoClose={4000}
                    hideProgressBar={false}
                    newestOnTop={true}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                    transition={Slide}
                />
            </>
        );
    },
    progress: {
        color: '#4B5563',
    },
});

initializeTheme();
initializeThemeColor();
