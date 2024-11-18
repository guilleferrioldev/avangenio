import { AuthButtons, SearchGamesPanel, CarruselSection} from "@/components";
import { ButtonPosition, IGame } from "@/types";

interface StreamingSectionProps {
    games?: IGame[];
}

export default function StreamingSection({games}: StreamingSectionProps) {
  return (
    <section className="w-full p-10 rounded-lg md:h-[80vh] text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 w-full h-full">
            <div className="bg-gray-800 flex flex-col justify-center items-center w-full h-[600px] p-10 gap-4 rounded-t-2xl md:rounded-l-2xl md:rounded-r-none">
                <div className="flex flex-col items-start justify-center">
                    <h1 className="text-[3rem] md:text-[4rem] font-bold">
                        <p>start</p>
                        <p className="text-violet-500"><b>streaming</b></p> 
                        <p>games</p> 
                        <p>differently</p>
                    </h1>
                    <p className="text-gray-300">gamor now has <b className="text-white">stream party</b> platform </p>
                </div>
                <AuthButtons
                    position={ButtonPosition.REVERSE}
                    classNameSignIn="text-white hover:text-orange-500 transition-all duration-300 ease-in-out"
                    classNameSignUp="bg-gray-600 text-white hover:bg-gray-100 hover:text-orange-500 p-2 rounded-full transition-all duration-300 ease-in-out"
                />
            </div>

            <CarruselSection games={games}/>
            <SearchGamesPanel/>
        </div>
    </section>
  )
}