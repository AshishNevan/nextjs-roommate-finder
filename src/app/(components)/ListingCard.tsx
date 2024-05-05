import Link from "next/link";

const ListingCard = ({listing}: any) => {
    return (
        <Link href={`/listings/${listing._id}`} style={{display:"contents"}}>
            <div className="flex flex-col rounded-md shadow-lg p-3 m-2 bg-gray-200 h-52">
                <h4 className="text-black">{listing.location.address}</h4>
                <div className="w-full border border-gray-900 h-48">
                    {listing.images && listing.images[0] ? (
                        <img className="object-fill h-40 w-full" src={listing.images[0]} alt="" />
                    ) : (
                        <div className="h-full flex justify-center items-center">No Image Available</div>
                    )}
                </div>
            </div>
        </Link>
    )
}
export default ListingCard;