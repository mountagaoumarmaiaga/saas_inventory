import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { UserInfo } from '@/components/user-info';
import { UserMenuContent } from '@/components/user-menu-content';
import { useIsMobile } from '@/hooks/use-mobile';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { ChevronsUpDown, UserRound } from 'lucide-react';

export function NavUser() {
    const { auth } = usePage<SharedData>().props;
    const { state } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="group/user rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-primary/60/10 hover:scale-[1.02] data-[state=open]:bg-gradient-to-r data-[state=open]:from-primary/10 data-[state=open]:to-primary/60/10 transition-all duration-300"
                            data-test="sidebar-menu-button"
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/60 rounded-lg blur-md opacity-0 group-hover/user:opacity-40 transition-opacity duration-300" />
                                <div className="relative flex aspect-square size-9 items-center justify-center rounded-lg bg-gradient-to-br from-primary/20 to-primary/60/20 border border-primary/30 text-primary">
                                    <UserRound className="size-4" />
                                </div>
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold text-foreground">{auth.user.name}</span>
                                <span className="truncate text-xs text-muted-foreground">{auth.user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4 text-muted-foreground group-hover/user:text-primary transition-colors duration-300" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                        align="end"
                        side={
                            isMobile
                                ? 'bottom'
                                : state === 'collapsed'
                                    ? 'left'
                                    : 'bottom'
                        }
                    >
                        <UserMenuContent user={auth.user} />
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
