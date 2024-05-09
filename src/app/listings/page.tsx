import ListingDisplay from "@/app/(components)/ListingDisplay";
import { getAllListings, ListingData } from "@/app/lib/listingActions";

export default async function listings() {
  const { data, error }: ListingData = await getAllListings();

  if (error || !data) {
    return <div>No listings found {error}</div>;
  } else {
    return (
      <div className="h-full mx-auto py-4 w-full">
        <ListingDisplay listings={data} />
      </div>
    );
  }
}
