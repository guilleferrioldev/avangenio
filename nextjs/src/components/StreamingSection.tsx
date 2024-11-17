import { AuthButtons, SearchChannelsPanel } from "@/components";
import { ButtonPosition } from "@/types";

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
            <div>
                <h1 className="text-2xl font-bold">Streaming</h1>
            </div>
            
            <SearchChannelsPanel/>
        </div>
    </section>
  )
}