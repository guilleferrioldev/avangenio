import { geTopGamesAction } from "@/actions";
import { TopGamesSection, Header, StreamingSection, TopGamesSkeleton } from "@/components";
import { Suspense } from "react";

export default async function Home() {
  try {
    const { data: games } = await geTopGamesAction();
    return (
      <main className="flex flex-col bg-my-dark-violet h-screen overflow-y-scroll overflow-x-hidden">
        <Header/>
        <StreamingSection games={games}/>
        <Suspense fallback={<TopGamesSkeleton/>}>
          <TopGamesSection/>
        </Suspense>
      </main>
    );
  } catch (error) {
    console.error(error);
    return <div>Error</div>
  }

}
