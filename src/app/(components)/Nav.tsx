import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

const Nav = async () => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  return (
    <div className="nav border border-black">
      <div className="col-span-1">something</div>
      <div className="col-span-3 text-center">logo</div>
      {data && data.user && data.user.email ? (
        <div className="col-span-1 text-right">{data.user.email}</div>
      ) : (
        <Link href="/login">
          <div className="col-span-1 text-right">Login</div>
        </Link>
      )}
    </div>
  );
};
export default Nav;
