import Listing from "@/app/(models)/Listing";
import ListingDisplay from "@/app/(components)/ListingDisplay";
// import {connectToDatabase} from "@/utils/database";
import Head from "next/head";
import clientPromise from "@/utils/database";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

export default async function listings() {
    const getListings = async () => {
        try {
            // await connectToDatabase();
            const res = await fetch("http://localhost:3000/api/listings", {
                cache: "no-cache"
            })
            return res.json();
        } catch (error) {
            console.error(error);
        }
    }
    const listings = await getListings();
    // console.log(listings);
    const listingsData: Listing[] = listings.data;

    return (
        <div className="h-full mx-auto py-4 w-full">
            <ListingDisplay listings={listingsData}/>
        </div>
    );
}