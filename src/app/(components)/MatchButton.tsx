"use client";
import { createClient } from "@/utils/supabase/client";
import { Button } from "@/components/ui/button";
const MatchButton = (listingid: any) => {
  const handleMatch = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.log(error);
      window.alert("Need to be logged in");
      return;
    }
    const res = await fetch(`/api/matches`, {
      method: "POST",
      body: JSON.stringify({ listingid, data }),
    });
    if (!res.ok) {
      console.log("failed to create a match");
      alert("Failed to create a match");
    } else {
      alert("Match was created");
    }
  };

  return (
    <Button onClick={async () => await handleMatch()}>
      Apply to be a roommate
    </Button>
  );
};

export default MatchButton;
