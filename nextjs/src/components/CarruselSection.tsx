"use client";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import { IGame } from "@/types";

interface CarruselSectionProps {
    games?: IGame[];
}

export default function CarruselSection({games}: CarruselSectionProps) {   
  const getImageUrl = (url: string | undefined) => {
    if (!url) return "";

    if(url.includes('{width}x{height}')){
        const isMobile = window.innerWidth <= 768;
        const width = isMobile ? 300 : 600;
        return url.replace("{width}x{height}", `${width}x${width}`);
    } else {
      return url; 
    }
  };
  
    return (
                <Carousel className="w-full h-full">
                    <CarouselContent className="w-full h-full">
                        {games?.map((game, index) => (
                            <CarouselItem key={index} className="w-full h-full">
                              <Card className="w-full h-full border-none">
                                <CardContent className="w-[105%] h-[600px] aspect-square" style={{
                                    backgroundImage: `url(${getImageUrl(game.box_art_url)})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}>
                                </CardContent>
                              </Card>
                          </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-0 flex items-center justify-between text-black bottom-[50%] text-sm">
                        <CarouselPrevious className="relative left-10" />
                        <CarouselNext className="relative right-10" />
                    </div>
                </Carousel>
    ) 
}

