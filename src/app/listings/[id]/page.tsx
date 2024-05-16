import Listing from "@/app/(models)/Listing";
import { ListingData, getListingById } from "@/app/lib/listingActions";
import Image from "next/image";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";

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
      <main>
        <div className="flex flex-col items-center">
          {property.images.length > 0 ? (
            <Carousel className="w-full max-w-md">
              <CarouselContent>
                {property.images.map((_, index) => (
                  <CarouselItem key={index}>
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-6">
                          <AspectRatio ratio={1 / 1}>
                            <Image
                              src={property.images[index]}
                              alt=""
                              fill
                              objectFit="cover"
                            />
                          </AspectRatio>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) : (
            <div className="h-full flex justify-center items-center">
              <p>Image Unavailable</p>
            </div>
          )}
          <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-2 mx-2">
            <div className="col-span-2 py-4">
              <div className="flex flex-row justify-between">
                <div className="w-3/4">
                  <h1>{property.location.address}</h1>
                </div>
                <div className="flex flex-row gap-x-2">
                  <button>
                    <h3>🖤</h3>
                  </button>
                  <button>
                    <h3>📎</h3>
                  </button>
                </div>
              </div>
              <h2>{property.title}</h2>
              <p>Description: {property.description}</p>
            </div>
            <div className="col-span-1 flex flex-col m-2 gap-2">
              <Card className="h-32 my-auto justify-items-center">
                <div className="flex flex-col justify-evenly h-full">
                  <CardTitle className="text-center">Interested?</CardTitle>
                  <CardContent className="mx-auto">
                    <Button>Apply to be a roommate</Button>
                  </CardContent>
                </div>
              </Card>
              <Card>
                <CardContent>
                  <h3 className="text-center">Map</h3>
                  <div className=" aspect-square">
                    <iframe
                      src={`https://maps.google.com/maps?q=${property.location.address},${property.location.city}&z=15&output=embed`}
                      width="100%"
                      height="100%"
                      allowFullScreen
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
