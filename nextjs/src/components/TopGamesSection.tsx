"use client";

import { GameCard, TopGamesSkeleton} from "@/components";
import { ArrowBigRightIcon, ArrowBigLeftIcon } from "lucide-react";
import { useGames } from "@/hooks";

export default function TopGamesSection() {
  const { games, setGames, page, setPage, acumulatedGames, isLoading, fetchGames } = useGames();

  const handleBefore = () => {
    if (page === 0) return
    setGames(acumulatedGames.slice(page - 8, page));
    setPage(page - 8)
 }

  const handleNext = () => {
     if (games.length < 8) return
     if (page + 8 === acumulatedGames.length ) {
      fetchGames()
     } else {
      setGames(acumulatedGames.slice(page + 8, page + 16));
     }
     setPage(page + 8)
  }

  return (
    <section className="w-full p-10 rounded-lg text-white flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center order-1 md:order-1 gap-2">
        <h1 className="text-2xl font-bold">Trending Categories</h1>
        
        <div className="flex justify-around items-center order-2 md:order-3 w-[30%]">
          <ArrowBigLeftIcon className={`h-10 w-10 text-white cursor-pointer ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleBefore}/>
          <ArrowBigRightIcon className="h-10 w-10 text-white cursor-pointer" onClick={handleNext} />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[40vh] order-3 md:order-2 w-full">
        {isLoading ? (
          <TopGamesSkeleton/>
        ) : (
          games.map((game, index) => (
            <GameCard key={index} game={game} index={index} page={page}/>
          ))
        )}
      </div>
    </section>
  );
}

