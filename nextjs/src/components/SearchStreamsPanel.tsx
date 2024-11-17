import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { PartyPopper, Database, Video } from 'lucide-react'
import { Button } from "@/components/ui/button";

export default function SearchStreamsPanel() {
  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center w-full  h-[600px] p-10 gap-4 rounded-b-2xl md:rounded-r-2xl md:rounded-b-none">
                <div className="flex flex-col justify-start w-full md:h-[20%] gap-4 ">
                    <h3><b className="text-gray-600 text-xl">01.</b> Choose platform</h3>

                    <Tabs defaultValue="party" className="w-full h-10 md:h-[50%]">
                        <TabsList className="w-full h-full bg-gray-900 text-white rounded-3xl">
                            <TabsTrigger value="party" className="flex items-center gap-2 rounded-full w-[30%] h-[80%] selection:bg-gray-900 selection:text-white">
                                <PartyPopper className="h-4 w-4 text-blue-500" />  Party
                            </TabsTrigger>
                            <TabsTrigger value="matchs" className="flex items-center gap-2 rounded-full w-[30%] h-[80%]">
                                <Database className="h-4 w-4 text-green-500" /> Matchs
                            </TabsTrigger>
                            <TabsTrigger value="streams" className="flex items-center gap-2 rounded-full w-[30%] h-[80%]">
                                <Video className="h-4 w-4 text-red-500" /> Streams
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
                
                <div className="flex flex-col justify-start w-full md:h-[80%] gap-4">
                    <h3><b className="text-gray-600 text-xl">02.</b> Searching Game</h3>
                    
                    <div className="w-full h-[90%] bg-gray-900 rounded-2xl p-4">
                        <input type="text" 
                        className="w-full h-2/12 bg-gray-900 text-white rounded-2xl focus:outline-none focus:ring-0 pl-2" 
                        placeholder="Search a channel"
                        />
                        <Separator className="my-4" />
                        <div className="flex flex-col gap-4 w-full h-[70%] overflow-y-scroll">
                            
                        </div>
                        <Button className="w-full bg-white text-black font-bold md:20%">
                            Search Now
                        </Button>
                    </div>
                </div>
            </div>
  )
}