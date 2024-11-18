"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { PartyPopper, Database, Video, PlusIcon } from 'lucide-react'
import { Button } from "@/components/ui/button";
import { FormEvent,  useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { useCategories } from "@/hooks";

export default function SearchGamesPanel() {
    const { ref, inView } = useInView();
    const [ value, setValue] = useState("");
    const {games, setGames, fetchCategories , query, cursor, setCursor, setQuery, defaulFetchCategories} = useCategories();

    useEffect(() => {
        if (query) {
            fetchCategories(query, cursor)
        } else {
            defaulFetchCategories()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query]);

    useEffect(() => {
        if (inView && cursor) {
            if (query) {
                fetchCategories(query, cursor)
            } else {
                defaulFetchCategories()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [inView]);

    const hadleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault()
        setGames([])
        setCursor(undefined)
        setQuery(value)
    }

  return (
    <div className="bg-gray-800 flex flex-col justify-center items-center w-full  h-[600px] p-10 gap-4 rounded-b-2xl md:rounded-r-2xl md:rounded-b-none">
                <div className="flex flex-col justify-start w-full h-[20%] gap-4 ">
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
                
                <div className="flex flex-col justify-start w-full h-[80%] gap-4">
                    <h3><b className="text-gray-600 text-xl">02.</b> Searching Game</h3>
                    
                    <form className="w-full h-[90%] bg-gray-900 rounded-2xl p-4">
                        <input type="text" 
                        required
                        onChange={(e) => setValue(e.target.value)}
                        className="w-full h-2/12 bg-gray-900 text-white rounded-2xl focus:outline-none focus:ring-0 pl-2" 
                        placeholder="Write a game name"
                        />
                        <Separator className="my-4" />
                        <div className="flex flex-col items-center space-between w-full h-[80%]">
                            <ul className="flex flex-col gap-6 md:gap-4 w-full h-full overflow-y-scroll overflow-x-hidden">
                                {games.map((game, index) => (
                                    <li key={index} className="w-full h-[25px] text-bold rounded-md p-2 flex justify-between items-center">
                                        <span className="flex-shrink-1">{game.name}</span>
                                        <button type="button" className="w-5 h-5 bg-gray-600 rounded-sm ml-2">
                                            <PlusIcon className="w-full h-full text-white" />
                                        </button>
                                    </li>
                                ))}
                                <div ref={ref} style={{ opacity: 0 }}>
                                    <span>More</span>
                                </div>
                            </ul>
                            <Button 
                            type="submit"
                            className="w-full bg-white text-black font-bold h-[20%] hover:bg-gray-500" 
                            onClick={hadleSubmit}>
                                Search Now
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
  )
}