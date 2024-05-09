"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import Listing from "@/app/(models)/Listing";
const ListingForm = () => {
    const router = useRouter()

    const handleChange = (e: { target: { value: any; name: any; }; }) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }
    const handleChangeAddress = (e: { target: { value: any; name: any; }; }) => {
        const value = e.target.value;
        const name = e.target.name;
        let {location} = {...formData}
        location.address = value
        setFormData((prevState) => ({
            ...prevState,
            location: location
        }))
    }
    const handleChangeLocation = (e: { target: { value: any; name: any; }; }) => {
        const value = e.target.value;
        const name = e.target.name;
        setFormData((prevState) => ({
            ...prevState,
            location: {
                ...prevState.location,
                [name]: value
            }
        }))
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        const res = await fetch("/api/listings", {
            method: "POST",
            body: JSON.stringify({formData}),
            // "content-type": "application/json",
        })
        if (!res.ok) {
            // console.log(await res.json())
            throw new Error("Failed to save listing")
        }
        router.refresh()
        router.push("/listings")
    }

    const startingListingForm = new Listing("", "", 0, 0, 0, 0, [], {address: "", city: "", latitude: 0, longitude: 0, state: "", zip_code:""}, [], "")
    const [formData, setFormData] = useState<Listing>(startingListingForm)
    return (
        <div className="flex justify-center">
            <form className="flex flex-col w-1/2" method="post" onSubmit={handleSubmit}>
                <h2 className="text-center">Create your listing</h2>
                <label>Title</label>
                <input id="title" name="title" type="text" onChange={handleChange} required={true}
                       value={formData.title}/>
                <label>Description</label>
                <textarea id="description" name="description" onChange={handleChange} required={true}
                          value={formData.description} rows={3}/>
                <label>Price</label>
                <input id="price" name="price" type="number" onChange={handleChange} required={true}
                       value={formData.price}/>
                <label>Bedrooms</label>
                <input id="bedrooms" name="bedrooms" type="number" onChange={handleChange} required={true}
                       value={formData.bedrooms}/>
                <label>Bathrooms</label>
                <input id="bathrooms" name="bathrooms" type="number" onChange={handleChange} required={true}
                       value={formData.bathrooms}/>
                <label>Area</label>
                <input id="area" name="area" type="number" onChange={handleChange} required={true}
                       value={formData.area}/>
                <label>Location</label>
                <div className="grid grid-cols-5">
                    <label>Address</label>
                    <input id="address" name="address" type="text" onChange={handleChangeLocation} required={true}
                           value={formData.location.address} className="col-span-4"/>
                    <label>City</label>
                    <input id="city" name="city" type="text" onChange={handleChangeLocation} required={true}
                           value={formData.location.city} className="col-span-4"/>
                    <label>State</label>
                    <input id="state" name="state" type="text" onChange={handleChangeLocation} required={true}
                           value={formData.location.state} className="col-span-4"/>
                    <label>Zip code</label>
                    <input id="zip_code" name="zip_code" type="text" onChange={handleChangeLocation} required={true}
                           value={formData.location.zip_code} className="col-span-4"/>
                </div>
                <input type="submit" value="Submit" className="btn"/>
            </form>
        </div>
    )
}
export default ListingForm