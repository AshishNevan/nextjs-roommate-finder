import ListingDisplay from "@/app/(components)/ListingDisplay";
import { getAllListings, ListingData } from "@/app/lib/listingActions";

export default async function listings() {
  const { data, error }: ListingData = await getAllListings();

  if (error || !data) {
    return <main>{`No listings found error: ${error}`}</main>;
  } else {
    return (
      <main>
        <ListingDisplay listings={data} />
      </main>
    );
  }
}
