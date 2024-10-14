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
import { useUser } from '@/hooks/user/use-user';
import { signOut } from 'next-auth/react';

const UserMenu = () => {
  const user = useUser();
  const name = user?.name ? user.name : user?.email;

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
          <p className="w-36 truncate">{name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <UserMenuItem onSelect={() => signOut()}>Log Out</UserMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type UserMenuItemProps = {
  children: React.ReactNode;
  onSelect?: ((event: Event) => void) | undefined;
};

const UserMenuItem = ({ children, onSelect }: UserMenuItemProps) => {
  return (
    <DropdownMenuItem onSelect={onSelect} className="w-44 cursor-pointer">
      {children}
    </DropdownMenuItem>
  );
};

export default UserMenu;
