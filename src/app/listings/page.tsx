import ListingDisplay from "@/app/(components)/ListingDisplay";
import { getAllListings, ListingData } from "@/app/lib/listingActions";

export default async function listings() {
  const listingsData: ListingData = await getAllListings();

  if (listingsData.error) {
    throw new Error("Error fetching listings");
  } else {
    if (!listingsData.data) {
      return <div>No listings found</div>;
    }
    return (
      <div className="h-full mx-auto py-4 w-full">
        <ListingDisplay listings={listingsData.data} />
      </div>
    );
  }
}
