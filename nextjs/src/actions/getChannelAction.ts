"use server";

import { Channel } from "diagnostics_channel";

export async function getChannelAction(query: string): Promise<Channel[]> {
    try {
        if (query) {
            const response = await fetch(`https://api.twitch.tv/helix/search/channels?query=${query}`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/hal+json",
                    Authorization: `Bearer ${process.env.TWITCH_API_KEY}`,
                    "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
                },
            });
            const data = await response.json();
            return data.data;
        } else {
            const response = await fetch(`https://api.twitch.tv/helix/search/channels?query`, {
                method: "GET",
                headers: {
                    "Content-Type": 'application/json',
                    Accept: "application/hal+json",
                    Authorization: `Bearer ${process.env.TWITCH_API_KEY}`,
                    "Client-Id": `${process.env.TWITCH_CLIENT_ID}`,
                },
            });
            const data = await response.json();
            return data.data;
        }
       
    } catch (error) {
        console.error(error);
        return [];
    }
}