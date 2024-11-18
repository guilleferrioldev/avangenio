"use server";


export async function getCategoriesAction(query: string): Promise<[]> {
    try {
        const response = await fetch(`${process.env.BASE_URL}/search/categories?query=${query}&first=3`, {
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