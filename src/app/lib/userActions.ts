import clientPromise from "@/utils/database";
import { ObjectId } from "mongodb";
import User from "../(models)/User";

export const getUserById = async (id: string): Promise<UserData> => {
  try {
    const client = await clientPromise;
    const db = client.db("roomate-finder");
    const query = { _id: new ObjectId(id) };
    const user = (await db
      .collection("Users")
      .findOne(query)) as unknown as User;
    return Promise.resolve({ data: user._id!, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};

export const createUser = async (user: User): Promise<UserData> => {
  try {
    const client = await clientPromise;
    const db = client.db("roomate-finder");
    // Convert _id to ObjectId
    const newUser = new User(
      "",
      user.email,
      user.password,
      "",
      "",
      0,
      "",
      "",
      "",
      {
        smoking: false,
        pets: false,
        study_habits: "",
        budget: 0,
        sleeping_habits: "",
        move_out_date: "",
        move_in_date: "",
      },
      {
        address: "",
        city: "",
        state: "",
        zip_code: "",
        latitude: 0,
        longitude: 0,
      },
      new Date().toISOString()
    );
    const result = await db
      .collection("Users")
      .insertOne({ ...newUser, _id: new ObjectId(newUser._id) });
    if (!result.acknowledged) {
      return Promise.resolve({
        data: null,
        error: "Failed to insert user",
      });
    }
    const newQuery = { _id: new ObjectId((newUser as any)._id) };
    let { _id } = (await db
      .collection("Users")
      .findOne(newQuery)) as unknown as User;
    return Promise.resolve({ data: null, error: null });
  } catch (error: any) {
    return Promise.resolve({ data: null, error: error.message });
  }
};
export type UserData = {
  data: string | null;
  error: string | null;
};
