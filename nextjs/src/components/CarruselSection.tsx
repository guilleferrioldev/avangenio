import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
import { IGame } from "@/types";
import Image from "next/image";

interface CarruselSectionProps {
    games?: IGame[];
}

export default function CarruselSection({games}: CarruselSectionProps) {    
    return (
        <div className="flex justify-center items-center w-full h-full">
                <Carousel className="w-full h-full flex justify-center items-center">
                    <CarouselContent>
                        {games?.map((game, index) => (
                            <CarouselItem key={index} className="w-full h-full"> {/* Added w-full h-full */}
                                {game.box_art_url && (
                                    <Image
                                        src={game.box_art_url.replace("{width}x{height}", "1080x720")}
                                        alt={`Cover for ${game.name}`}
                                        width={100}
                                        height={100}
                                        style={{ objectFit: 'cover' }}
                                        className="rounded-lg"
                                    />
                                )}
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-0 flex items-center justify-between text-black bottom-[50%] text-sm">
                        <CarouselPrevious className="relative left-10" />
                        <CarouselNext className="relative right-10" />
                    </div>
                </Carousel>
            </div>

    ) 
}

