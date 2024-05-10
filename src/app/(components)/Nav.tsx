import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
  TooltipContent,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const Nav = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  // console.log(data);
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-800">
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col space-y-2">
              <DropdownMenuSeparator />
              <Link href={"/"}>
                <Button variant={"link"}>Home</Button>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/listings"}>
                <Button variant={"link"}>View Listings</Button>
              </Link>
              <DropdownMenuSeparator />
              <Link href={"/createListing"}>
                <Button variant={"link"}>Create Listing</Button>
              </Link>
              <DropdownMenuSeparator />
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <Avatar>
          <AvatarImage src="https://example.com/user.png" alt="User Profile" />
        </Avatar>
      </div>
      <div className="flex items-center space-x-4">
        {data.user?.email ? (
          <Link href={`/users/${data.user.id}`}>
            <Avatar>
              <AvatarImage
                src="https://example.com/user.png"
                alt="User Profile"
              />
              <AvatarFallback>
                {data.user?.email?.charAt(0).toLocaleUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Link>
        ) : (
          <Link href="/login">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://example.com/user.png"
                      alt="User Profile"
                    />
                    <AvatarFallback>{"?"}</AvatarFallback>
                  </Avatar>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Login</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Link>
        )}
      </div>
    </nav>
  );
};
export default Nav;
