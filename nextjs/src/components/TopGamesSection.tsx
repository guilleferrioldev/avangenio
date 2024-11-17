"use client";

import { geTopGamesAction } from "@/actions";
import { IGame } from "@/types";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { GameCard } from "@/components";
import { ArrowBigRightIcon, ArrowBigLeftIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";


export default function TopGamesSection() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [games, setGames] = useState<IGame[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [cursor, setCursor] = useState<string | undefined>();

  useEffect(() => {
    const fetchGames = async () => {
      setIsLoading(true);
      try {
        const { data, next } = await geTopGamesAction(searchParams.get("search"), cursor);
        const fetchedGames = [...data];
        setCursor(next);
        setGames(fetchedGames);
      } finally {
        setIsLoading(false);
      }
    };
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, searchParams]);

  const handleChangeSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams)

    if (value) {
        params.set("search", value)
    } else {
        params.delete("search")   
    }
    setCursor(undefined)
    setPage(0)
    replace(`${pathname}?${params.toString()}`)
}, 500)

  return (
    <section className="w-full p-10 rounded-lg text-white flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between items-center order-1 md:order-1 gap-2">
        <h1 className="text-2xl font-bold">Trending Categories</h1>
        <input 
          placeholder="Searching game..." 
          onChange={(e) => handleChangeSearch(e.target.value)} 
          defaultValue={searchParams.get("search") ?? ""}
          className="w-auto p-2 h-10 bg-gray-800 text-white rounded-2xl focus:outline-none focus:ring-0"/>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:h-[40vh] order-3 md:order-2">
        {isLoading ? (
          Array.from({ length: 8 }).map((_, index) => (
            <Skeleton key={index} className="bg-gray-800 rounded-lg h-full">
              <div className="h-6 w-full rounded-lg bg-gray-800 my-2" />
            </Skeleton>
          ))
        ) : (
          games.map((game, index) => (
            <GameCard key={index} game={game} index={index} page={page}/>
          ))
        )}
      </div>

      <div className="w-full flex justify-around items-center order-2 md:order-3">
        <ArrowBigLeftIcon className={`h-10 w-10 text-white cursor-pointer ${page === 0 ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => page !== 0 &&setPage(page - 8)}/>
        <ArrowBigRightIcon className="h-10 w-10 text-white cursor-pointer" onClick={() => setPage(page + 8)} />
      </div>
    </section>
  );
}

