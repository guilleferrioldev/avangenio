"use client";

import { geTopGamesAction } from "@/actions";
import { IGame } from "@/types";
import { useCallback, useEffect, useState } from "react";
import { GameCard, TopGamesSkeleton} from "@/components";
import { ArrowBigRightIcon, ArrowBigLeftIcon } from "lucide-react";

interface TopGamesSectionProps {
    games?: IGame[];
}

export default function TopGamesSection({games}: TopGamesSectionProps) {
  const [gamor, setGames] = useState<IGame[]>(games ?? []);
  const [acumulatedGames, setAcumulatedGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState<string | undefined>();

  const fetchGames = useCallback(async () => {
    setIsLoading(true);
    try {
     const { data, next } = await geTopGamesAction(cursor);
     setCursor(next);
     setAcumulatedGames(prevGames => [...prevGames, ...data]);
     setGames(data);
    } finally {
     setIsLoading(false);
    }
   }, [cursor]);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleBefore = () => {
    if (page === 0) return
    setGames(acumulatedGames.slice(page - 8, page));
    setPage(page - 8)
 }

  const handleNext = () => {
     if (gamor.length < 8) return
     console.log(page, page + 8, acumulatedGames.length)
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
          gamor.map((game, index) => (
            <GameCard key={index} game={game} index={index} page={page}/>
          ))
        )}
      </div>
    </section>
  );
}

