import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useActiveUrl } from '@/hooks/use-active-url';
import { type NavGroup } from '@/types';
import { Link } from '@inertiajs/react';

export function NavMain({ groups = [] }: { groups: NavGroup[] }) {
    const { urlIsActive } = useActiveUrl();

    return (
        <>
            {groups.map((group) => (
                <SidebarGroup key={group.title} className="px-3 py-2">
                    <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/70 mb-2">
                        {group.title}
                    </SidebarGroupLabel>
                    <SidebarMenu className="space-y-1">
                        {group.items.map((item) => (
                            <SidebarMenuItem key={item.title}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={urlIsActive(item.href)}
                                    tooltip={{ children: item.title }}
                                    className="relative rounded-xl px-3 py-2.5 hover:bg-gradient-to-r hover:from-primary/5 hover:to-accent/5 hover:scale-[1.02] data-[active=true]:bg-gradient-to-r data-[active=true]:from-primary/10 data-[active=true]:to-accent/10 data-[active=true]:shadow-md data-[active=true]:shadow-primary/20 transition-all duration-300 group/item"
                                >
                                    <Link href={item.href} prefetch className="flex items-center gap-3">
                                        {item.icon && (
                                            <div className="relative">
                                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg blur-sm opacity-0 group-data-[active=true]/item:opacity-40 transition-opacity duration-300" />
                                                <div className="relative flex items-center justify-center size-5">
                                                    <item.icon className="size-5 text-muted-foreground group-data-[active=true]/menu-button:text-primary group-hover/menu-button:text-foreground transition-colors duration-300" />
                                                </div>
                                            </div>
                                        )}
                                        <span className="font-medium group-data-[active=true]/menu-button:font-semibold group-data-[active=true]/menu-button:text-primary transition-all duration-300">{item.title}</span>
                                        {urlIsActive(item.href) && (
                                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-primary to-accent rounded-r-full shadow-[0_0_8px_hsl(var(--primary))]" />
                                        )}
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            ))}
        </>
    );
}
