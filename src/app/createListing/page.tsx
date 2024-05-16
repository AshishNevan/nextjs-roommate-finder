import ListingForm from "@/app/(components)/ListingForm";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function createListing() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    redirect("/login");
  }
  return (
    <main>
      <ListingForm />
    </main>
  );
}
