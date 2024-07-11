import Image from "next/image";
import Link from "next/link";
import Listing from "../(models)/Listing";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ListingCard = ({ listing }: { listing: Listing }) => {
  return (
    <Link href={`/listings/${listing.id}`} style={{ display: "contents" }}>
      <Card className="">
        <CardHeader>
          <CardTitle>{listing.location.address}</CardTitle>
        </CardHeader>
        <CardContent>
          {listing.images && listing.images[0] ? (
            <AspectRatio ratio={9 / 3} className="bg-muted">
              <Image
                className="rounded-md object-cover"
                src={`${listing.images[0]}`}
                alt=""
                fill
              />
            </AspectRatio>
          ) : (
            <AspectRatio ratio={9 / 3} className="bg-muted">
              <div className="h-full flex justify-center items-center">
                Image Unavailable
              </div>
            </AspectRatio>
          )}
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </Link>
  );
};
export default ListingCard;
