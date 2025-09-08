import * as React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

export function Demo() {
  return (
    <Carousel className="w-full max-w-sm md:max-w-lg lg:max-w-xl">
      <CarouselContent>
        <CarouselItem key="1">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">
                  Have quick access to all the nearby CitiBike stations
                </h2>
                <p>See real time status of all the bikes</p>
                <ol>
                  <li>
                    1. See how distant the stations are (both in miles and km)
                  </li>
                  <li>2. Available stalls</li>
                  <li>3. Available regular bikes</li>
                  <li>4. Available electric bikes</li>
                  <li>5. Get directions to the station</li>
                </ol>
                <Image
                  src="/demo/demo01.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="2">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">
                  Add stations to your favorites
                </h2>
                <ol>
                  <li>1. Click on the star to add a station to favorites</li>
                  <li>2. Specify a name for the favorite</li>
                </ol>
                <Image
                  src="/demo/demo02.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="3">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">
                  Add stations to your favorites
                </h2>
                <p>Favorite stations appear with optional custom name</p>
                <Image
                  src="/demo/demo03.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="4">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">Access Favorites </h2>
                <Image
                  src="/demo/demo04.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="5">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">Access History </h2>
                <p>
                  Whenever you click the Navigation button o a station, it gets
                  added to the history
                </p>
                <ol>
                  <li>1. Delete all history</li>
                  <li>2. When you clicked on a station</li>
                  <li>3. Delete the specific record</li>
                  <li>4. Add the station to the favorites for easy access</li>
                </ol>
                <Image
                  src="/demo/demo05.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="6">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">Access the settings </h2>
                <p>Click on the user image to access the menu</p>
                <ol>
                  <li>1. Access the settings</li>
                </ol>
                <Image
                  src="/demo/demo06.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>

        <CarouselItem key="7">
          <div className="p-1">
            <Card>
              <CardContent className="flex flex-col gap-3 aspect-square justify-center">
                <h2 className="text-2xl font-semibold">Access the settings </h2>
                <p>Chose which map to use between Apple and Google Maps</p>
                <Image
                  src="/demo/demo07.jpeg"
                  width={500}
                  height={500}
                  alt="Picture of the author"
                />
              </CardContent>
            </Card>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
