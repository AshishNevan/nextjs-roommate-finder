import Listing from "@/app/(models)/Listing";
import Image from 'next/image'

export default async function property ({ params }: any)  {
    const getPropertyById = async (id: string) => {
        console.log("getPropertyById", id);
            const res = await fetch(`http://localhost:3000/api/Listings/${id}`, {
                cache: 'no-store'
            })
            if (!res.ok) {
                throw new Error("Failed to get property")
            }
            return res.json()
    }
    const resdata = await getPropertyById(params.id)
    const property: Listing = resdata.data
    return (
        <div className="h-screen flex flex-col items-center">
        <div className="w-full h-1/2">
            <img className="object-cover h-full" src={property.images[0]} alt={"Image"}></img>
        </div>
            <div className="grid sm: grid-cols-1 md:grid-cols-3 gap-x-2 w-screen">
                <div className="col-span-2">
                    <div className="flex flex-row justify-between">
                        <div className="w-3/4">
                            <h1 className="font-semibold text-gray-900 p-4">{property.location.address}</h1>
                        </div>
                        <div className="flex flex-row gap-x-2">
                            <button>favorite</button>
                            <button>share</button>
                        </div>
                    </div>
                    <h2 className="font-semibold text-gray-900 p-2">{property.title}</h2>
                    <hr className="border-gray-400 mx-2"/>
                    <p className="font-semibold text-gray-900 p-2">Description: {property.description}</p>
                </div>
                <div className="col-span-1 border border-black h-full py-4">
                    <h3 className="text-center">Contact</h3>
                    <div className="flex flex-col h-2/3 justify-center">
                        <button className="border border-black mx-4 rounded-lg hover:bg-blue-500">Apply to be a roommate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}