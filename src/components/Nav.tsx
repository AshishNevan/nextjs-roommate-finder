import { getCurrentUser } from "@/app/lib/userActions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Home, Menu, Search } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

const Nav = async () => {
  const { data, error } = await getCurrentUser();
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Home className="h-6 w-6" />
          <span className="sr-only">Roommate Finder</span>
        </Link>
        <Link
          href="/listings"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Browse
        </Link>
        <Link
          href="/createListing"
          className="text-muted-foreground transition-colors hover:text-foreground"
        >
          Create
        </Link>
        {data && (
          <Link
            href={`/matches/${data.user.id}`}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            Matches
          </Link>
        )}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Home className="h-6 w-6" />
              <span className="sr-only">Roommate Finder</span>
            </Link>
            <Link
              href="/listings"
              className="text-muted-foreground hover:text-foreground"
            >
              Browse
            </Link>
            <Link
              href="/createListing"
              className="text-muted-foreground hover:text-foreground"
            >
              Create
            </Link>
            {data && (
              <Link
                href={`/matches/${data.user.id}`}
                className="text-muted-foreground hover:text-foreground"
              >
                Matches
              </Link>
            )}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            {/*TODO:implement search*/}
            <Input
              type="search"
              placeholder="Search areas"
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        {!error && data.user?.email ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://example.com/user.png"
                    alt="User Profile"
                  />
                  <AvatarFallback>
                    {data.user?.email?.charAt(0).toLocaleUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={`/users/${data.user.id}`}>
                <DropdownMenuItem>Settings</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuItem>
                <LogoutButton />
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <Avatar>
                  <AvatarImage
                    src="https://example.com/user.png"
                    alt="User Profile"
                  />
                  <AvatarFallback>{"?"}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Anonymous User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/login">
                <DropdownMenuItem>Login / Signup</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};
export default Nav;
