import { geTopGamesAction } from '@/actions';
import { IGame } from '@/types';
import { useCallback, useEffect, useState } from 'react';

const useGames = () => {
  const [games, setGames] = useState<IGame[]>([]);
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
    } catch (error) {
      console.error(error)
    } finally {
     setIsLoading(false);
    }
   }, [cursor]);

   const reset = useCallback(() => {
    setAcumulatedGames([]);
    setPage(0);
    setCursor(undefined);
  }, []);

  useEffect(() => {
    fetchGames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { games, setGames, page, setPage, acumulatedGames, isLoading, fetchGames, reset, cursor, setCursor}; 
};

export default useGames;