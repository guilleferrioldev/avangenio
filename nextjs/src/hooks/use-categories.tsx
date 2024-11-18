import { getCategoriesAction } from "@/actions";
import { IGame } from "@/types";
import {  useCallback, useState } from "react";

const useCategories = () => {
    const [games, setGames] = useState<IGame[]>([]);
    const [query, setQuery] = useState<string>("fornite");
    const [cursor, setCursor] = useState<string>();

    const fetchCategories = useCallback(async (query: string, cursor?: string) => {
        try {
            const {data, next} = await getCategoriesAction(query, cursor);
            setGames(prevGames => [...prevGames, ...data]);
            setCursor(next);
        } catch (error) {
            console.error(error);
            setGames([]);
            setCursor(undefined);
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const defaulFetchCategories = useCallback(async () => {
        fetchCategories("fornite");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return { games, setGames, fetchCategories, query, setQuery, cursor, setCursor, defaulFetchCategories};
}

export default useCategories;