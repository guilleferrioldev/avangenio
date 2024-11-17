"use server";

import { IGame } from "@/types";

export async function geTopGamesAction(query?: string| null, cursor?: string): Promise<{ data: IGame[], next?: string }> {
    try {
        let queryString
        if (query) {
                queryString = `${process.env.BASE_URL}/search/categories?query=${query}&first=8`
        } else {
                queryString = `${process.env.BASE_URL}/games/top?first=8`
        }

        if (cursor) {
            queryString = queryString + `&after=${cursor}`
        }

        const response = await fetch(queryString, {
            method: "GET",
            headers: {
                "Content-Type": 'application/json',
                Accept: "application/hal+json",
                Authorization: `Bearer ${process.env.TWITCH_API_KEY}`,
                "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
            },
        });
        const data = await response.json();
        return { data: data.data ?? [], next: data.pagination?.cursor }
    } catch (error) {
        console.error(error);
        return { data: [], next: undefined };
    }
}