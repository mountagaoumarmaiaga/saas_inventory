import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
    fallback?: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-lg border bg-background p-8 text-center shadow-sm">
                    <div className="mb-4 rounded-full bg-red-100 p-3 dark:bg-red-900/20">
                        <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-foreground">
                        Une erreur est survenue
                    </h3>
                    <p className="mb-4 max-w-md text-sm text-muted-foreground">
                        Quelque chose s'est mal passé lors de l'affichage de ce composant.
                        Essayer de rafraîchir la page.
                    </p>
                    {this.state.error && (
                        <pre className="mb-4 max-w-md overflow-auto rounded bg-muted p-2 text-left text-xs text-muted-foreground">
                            {this.state.error.toString()}
                        </pre>
                    )}
                    <Button
                        variant="outline"
                        onClick={() => window.location.reload()}
                    >
                        Rafraîchir la page
                    </Button>
                </div>
            );
        }

        return this.props.children;
    }
}
