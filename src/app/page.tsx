import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export default async function Home() {
  return (
    <main>
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7 space-x-4">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl text-gray-900">
            Roommate matching for university students
          </h1>
          <p className="max-w-2xl mb-6 font-light lg:mb-8 md:text-lg lg:text-xl text-gray-700">
            Find you perfect roommates and apartment
          </p>
          <Button variant={"outline"}>
            <Link href="/createListing">find roommates</Link>
          </Button>
          <Button>
            <Link href="/listings">search apartments</Link>
          </Button>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <AspectRatio ratio={1} className="bg-muted">
            <Image
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"
              alt="mockup"
              fill
              className="rounded-lg object-cover"
            />
          </AspectRatio>
        </div>
      </div>
    </main>
  );
}
