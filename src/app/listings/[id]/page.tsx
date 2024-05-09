import Listing from "@/app/(models)/Listing";
import { ListingData, getListingById } from "@/app/lib/listingActions";
import Image from "next/image";

export default async function property({ params }: { params: { id: string } }) {
  if (!params.id) {
    throw new Error("No ID provided");
  }
  const { data, error }: ListingData = await getListingById(params.id);
  if (error) {
    throw new Error("listing not found: " + error);
  } else {
    const property: Listing = data![0];
    return (
      <div className="h-screen flex flex-col items-center">
        <div className="w-full h-1/2">
          <Image
            className="object-cover h-full"
            src={property.images[0]}
            alt={"Image"}
            width={500}
            height={500}
          />
        </div>
        <div className="grid sm: grid-cols-1 md:grid-cols-4 gap-x-2 mx-2">
          <div className="col-span-3 py-4">
            <div className="flex flex-row justify-between">
              <div className="w-3/4">
                <h1 className="font-semibold text-gray-900">
                  {property.location.address}
                </h1>
              </div>
              <div className="flex flex-row gap-x-2">
                <button>favorite</button>
                <button>share</button>
              </div>
            </div>
            <h2 className="font-semibold text-gray-900 p-2">
              {property.title}
            </h2>
            <hr className="border-gray-400 mx-2" />
            <p className="font-semibold text-gray-900 p-2">
              Description: {property.description}
            </p>
          </div>
          <div className="col-span-1 border border-black h-full py-4">
            <h3 className="text-center">Contact</h3>
            <div className="flex flex-col h-2/3 justify-center">
              <button className="border border-black mx-4 rounded-lg hover:bg-blue-500">
                Apply to be a roommate
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
