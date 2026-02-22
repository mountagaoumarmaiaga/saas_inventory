import React from "react";
import { PlaceholderPattern } from "@/components/ui/placeholder-pattern";
import AppLayout from "@/layouts/app-layout";
import { Head } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  title: string;
  breadcrumbs: BreadcrumbItem[];
  actions?: React.ReactNode;
}>;

export default function DashboardUI({ title, breadcrumbs, actions, children }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      {/* Header + Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 pt-6 pb-2">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
          <p className="text-sm font-medium text-muted-foreground/80 mt-1">Bienvenue sur votre espace de gestion</p>
        </div>

        {actions ? <div className="flex items-center gap-3">{actions}</div> : null}
      </div>

      <div className="p-6">
        {children || (
          <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/10" />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/10" />
              </div>
              <div className="relative aspect-video overflow-hidden rounded-xl border border-sidebar-border/70">
                <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/10" />
              </div>
            </div>

            <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min">
              <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/10" />
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
