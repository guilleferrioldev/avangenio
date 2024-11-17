"use server";


export async function getStreamsAction(): Promise<[]> {
    try {
        const response = await fetch(`https://api.twitch.tv/helix/streams`, {
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
    } catch (error) {
        console.error(error);
        return [];
    }
}