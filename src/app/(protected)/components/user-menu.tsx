'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/vendor/avatar';
import { Button } from '@/components/vendor/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/vendor/dropdown-menu';
import { useSidebarToggle } from '@/hooks/sidebar/use-sidebar-toggle';
import { useUser } from '@/hooks/user/use-user';
import { useStore } from '@/utils/store';
import { cn } from '@/utils/utils';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

const UserMenu = () => {
  const user = useUser();
  const name = user?.name ? user.name : user?.email;

  const sidebarStore = useStore(useSidebarToggle, (state) => state);
  const expanded = sidebarStore?.expanded;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="gap-2 text-ellipsis px-1.5 text-muted-foreground hover:bg-foreground/10"
        >
          <Avatar className="size-6 rounded-md text-xs">
            <AvatarImage src={user?.image || ''} />
            <AvatarFallback className="rounded-md bg-primary text-background">
              {name?.substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          {expanded && <p className="w-36 truncate text-left">{name}</p>}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/settings" className="size-full">
            Settings
          </Link>
        </DropdownMenuItem>
        <UserMenuItem
          className="flex items-center justify-between !text-destructive"
          onSelect={() => signOut()}
        >
          Log Out <LogOut className="size-4" />
        </UserMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type UserMenuItemProps = {
  children: React.ReactNode;
  onSelect?: ((event: Event) => void) | undefined;
  className?: string;
};

const UserMenuItem = ({ children, onSelect, className }: UserMenuItemProps) => {
  return (
    <DropdownMenuItem onSelect={onSelect} className={cn('w-44 cursor-pointer', className)}>
      {children}
    </DropdownMenuItem>
  );
};

export default UserMenu;
