"use client";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
const LogoutButton = () => {
  const supabase = createClient();
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.refresh();
      }}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
