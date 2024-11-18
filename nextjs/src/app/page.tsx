import { geTopGamesAction } from "@/actions";
import { TopGamesSection, Header, StreamingSection } from "@/components";

export default async function Home() {
    const { data: games } = await geTopGamesAction();
    return (
      <main className="flex flex-col bg-my-dark-violet h-screen overflow-y-scroll overflow-x-hidden">
        <Header/>
        <StreamingSection games={games}/>
        <TopGamesSection games={games}/>
      </main>
    );
}
