import { AuthButtons, SearchChannelsPanel } from "@/components";
import { ButtonPosition } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function StreamingSection() {
  return (
    <section className="w-full p-10 rounded-lg md:h-[80vh] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
            <div className="bg-gray-800 flex flex-col justify-center items-center w-full h-full p-10 gap-4 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none">
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-[3rem] md:text-[4rem] font-bold">
                        <p>start</p>
                        <p className="text-violet-500"><b>streaming</b></p> 
                        <p>games</p> 
                        <p>differently</p>
                    </h1>
                </div>
                <p className="text-gray-300">gamor now has <b className="text-white">stream party</b> platform </p>
                <AuthButtons
                    position={ButtonPosition.REVERSE}
                    classNameSignIn="text-white hover:text-orange-500 transition-all duration-300 ease-in-out"
                    classNameSignUp="bg-gray-600 text-white hover:bg-gray-100 hover:text-orange-500 p-2 rounded-full transition-all duration-300 ease-in-out"
                />
            </div>

            <div className="bg-red-200< flex justify-center items-center w-full h-full">
                <Carousel className="w-full h-full flexjustify-center items-center">
                    <CarouselContent>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <CarouselItem key={index}>
                                <div className="p-1">
                                    <div className="flex aspect-square items-center justify-center p-6">
                                        <span className="text-4xl font-semibold">{index + 1}</span>
                                    </div>
                                </div>
                        </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute inset-0 flex items-center justify-between text-black bottom-[50%] text-sm">
                        <CarouselPrevious className="relative left-10" />
                        <CarouselNext className="relative right-10" />
                    </div>
                </Carousel>
            </div>
            
            <SearchChannelsPanel/>
        </div>
    </section>
  )
}