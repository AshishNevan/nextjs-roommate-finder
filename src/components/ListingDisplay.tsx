import ListingCard from "@/components/ListingCard";
import Listing from "@/models/Listing";

const ListingDisplay = async ({ listings }: { listings: Listing[] }) => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
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