import { SignupFormSchema, FormState } from '@/utils/definitions'
// import bcrypt from "bcrypt"
import clientPromise from "@/utils/database";
import User from "@/app/(models)/User";
import { redirect } from "next/navigation";
import { createSession } from './session';

export async function signup(state: FormState, formData) {
    // Validate form fields
    const validatedFields = SignupFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
    })

    // If any form fields are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    // Call the provider or db to create a user...
    const { name, email, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    // const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Auth Library's API
    // const client = await clientPromise;
    // const db = client.db("roomate-finder");
    // const users = (await db
    //     .collection("users")
    //     .find({})
    //     .toArray()) as unknown as User[];
    const user = { name, email, password }
    const resData = await fetch("http://localhost:3000/api/users", {
        cache: "no-store",
        method: "POST",
        body: JSON.stringify({ user }),
    })
    // console.log(resData)
    const res = await resData.json()
    const { data } = res
    if (!data) {
        return {
            message: 'An error occurred while creating your account.',
        }
    }
    console.log("id", data)
    // TODO:
    // 4. Create user session
    // await createSession(data)
    // 5. Redirect user
    redirect(`/users/${data}`)
}

const getUserById = async (id: string) => {
    // console.log("getPropertyById", id);
    const res = await fetch(`http://localhost:3000/api/users/${id}`, {
        cache: 'no-store'
    })
    if (!res.ok) {
        throw new Error("Failed to get user")
    }
    return res.json()
}