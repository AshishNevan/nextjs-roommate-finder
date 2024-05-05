import Link from "next/link";

const ListingCard = ({listing}: any) => {
    return (
        <Link href={`/listings/${listing._id}`} style={{display:"contents"}}>
            <div className="flex flex-col rounded-md shadow-lg p-3 m-2 bg-gray-200 h-52">
                <h4 className="text-black">{listing.location.address}</h4>
                <div className="w-full border border-gray-900 h-48">
                    {/*<Image src={""} alt={"image"} width={100}/>*/}
                </div>
            </div>
        </Link>
    )
}
export default ListingCard;