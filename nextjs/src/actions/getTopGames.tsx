"use server";

import { IGame } from "@/types";

export async function geTopGamesAction(cursor?: string): Promise<{ data: IGame[], next?: string }> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/games/top?first=8${cursor ? `&after=${cursor}` : ""}`, {
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