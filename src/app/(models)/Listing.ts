import { ObjectId } from "mongodb";
// External dependencies
export default class Listing {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public bedrooms: number,
    public bathrooms: number,
    public area: number,
    public amenities: string[],
    public location: {
      address: string;
      city: string;
      state: string;
      zip_code: string;
      latitude: number;
      longitude: number;
    },
    public images: string[],
    public user_id: string,
    public _id?: ObjectId
  ) {}
}
// Class Implementation
