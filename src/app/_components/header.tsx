import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { getServerAuthSession } from '@/server/auth';
import ThemeButton from './theme-button';
import LogoutButton from '../(dashboard)/home/_client';

const Header = async () => {
  const session = await getServerAuthSession();

  const user = session?.user;

  const initials = user?.name
    ?.split(' ')
    ?.map((name) => name[0])
    ?.join('');

  return (
    <div className="flex items-center justify-between bg-accent px-5 py-2">
      <div>
        {/* Brand Icon Will Come here */}
        <h1 className="text-base font-semibold md:text-lg lg:text-2xl">
          Mudra
        </h1>
      </div>
      <div className="flex items-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {user && (
              <Avatar className="mr-7">
                <AvatarImage
                  src={user.image ? user.image : undefined}
                  alt="Pluto"
                />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="mt-4 w-full bg-primary shadow-lg"
            align="center"
          >
            <ThemeButton />
            <LogoutButton />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Header;
