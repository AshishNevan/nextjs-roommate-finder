import ListingCard from "@/app/(components)/ListingCard";
import Listing from "@/app/(models)/Listing";
import ListingForm from "@/app/(components)/ListingForm";
// import {connectToDatabase} from "@/utils/database";

const ListingDisplay = async ({ listings }: any) => {
  const dummyListing = new Listing(
    "abc",
    "",
    0,
    0,
    0,
    0,
    [],
    {
      address: "",
      city: "",
      latitude: 0,
      longitude: 0,
      state: "",
      zip_code: "",
    },
    [],
    ""
  );
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 m-4">
      {listings &&
        listings.map((listing: Listing) => (
          <div key={`${listing.id}`}>
            <ListingCard listing={listing} />
          </div>
        ))}
    </div>
  );
};
export default ListingDisplay;
