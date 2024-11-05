"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Listing from "@/models/Listing";
import { createClient } from "@/utils/supabase/client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ListingForm = () => {
  const router = useRouter();
  const handleChange = (e: { target: { value: any; name: any } }) => {
    const value = e.target.value;
    const name = e.target.name;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleChangeLocation = (e: { target: { value: any; name: any } }) => {
    const value = e.target.value;
    const name = e.target.name;
    setFormData((prevState) => ({
      ...prevState,
      location: {
        ...prevState.location,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const supabase = createClient();
    const { data, error } = await supabase.auth.getUser();
    if (error || !data?.user || !data?.user?.id) {
      router.push("/login");
      return;
    }
    formData.user_id = data.user.id;
    const res = await fetch("/api/listings", {
      method: "POST",
      body: JSON.stringify({ formData }),
      // "content-type": "application/json",
    });
    if (!res.ok) {
      // console.log(await res.json())
      throw new Error("Failed to save listing");
    }
    router.refresh();
    router.push("/listings");
  };

  const startingListingForm = new Listing(
    "",
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
  const [formData, setFormData] = useState<Listing>(startingListingForm);
  return (
    <div className="flex justify-center m-4">
      <form
        className="flex flex-col w-1/2 gap-2"
        method="post"
        onSubmit={handleSubmit}
      >
        <h2 className="text-center">Create your listing</h2>
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          type="text"
          onChange={handleChange}
          required={true}
          value={formData.title}
        />
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          onChange={handleChange}
          required={true}
          value={formData.description}
          rows={3}
        />
        <Label htmlFor="price">Price</Label>
        <Input
          id="price"
          name="price"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.price}
        />
        <Label htmlFor="bedrooms">Bedrooms</Label>
        <Input
          id="bedrooms"
          name="bedrooms"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.bedrooms}
        />
        <Label htmlFor="bathrooms">Bathrooms</Label>
        <Input
          id="bathrooms"
          name="bathrooms"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.bathrooms}
        />
        <Label htmlFor="area">Area</Label>
        <Input
          id="area"
          name="area"
          type="number"
          onChange={handleChange}
          required={true}
          value={formData.area}
        />
        <div className="grid grid-cols-5 gap-4">
          <Label htmlFor="address">Address</Label>
          <Input
            id="address"
            name="address"
            type="text"
            onChange={handleChangeLocation}
            required={true}
            value={formData.location.address}
            className="col-span-4"
          />
          <Label htmlFor="city">City</Label>
          <Input
            id="city"
            name="city"
            type="text"
            onChange={handleChangeLocation}
            required={true}
            value={formData.location.city}
            className="col-span-4"
          />
          <Label htmlFor="state">State</Label>
          <Input
            id="state"
            name="state"
            type="text"
            onChange={handleChangeLocation}
            required={true}
            value={formData.location.state}
            className="col-span-4"
          />
          <Label htmlFor="zip_code">Zip code</Label>
          <Input
            id="zip_code"
            name="zip_code"
            type="text"
            onChange={handleChangeLocation}
            required={true}
            value={formData.location.zip_code}
            className="col-span-4"
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};
export default ListingForm;
