import Listing from "@/app/(models)/Listing";
import ListingDisplay from "@/app/(components)/ListingDisplay";
import { getAllListings, ListingData } from "@/app/lib/listingActions";

export default async function listings() {
  const getListings = async () => {};
  const listings = await getListings();
  // console.log(listings);
  const listingsData: ListingData = await getAllListings();

  if (listingsData.error || !listingsData.data) {
    throw new Error("Error fetching listings");
  } else {
    return (
      <div className="h-full mx-auto py-4 w-full">
        <ListingDisplay listings={listingsData.data} />
      </div>
    );
  }
}
