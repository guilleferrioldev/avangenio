import { TopGamesSection, Header, StreamingSection, TopGamesSkeleton } from "@/components";
import { Suspense } from "react";

export default async function Home() {
  return (
    <main className="flex flex-col bg-my-dark-violet h-screen overflow-y-scroll overflow-x-hidden">
      <Header/>
      <StreamingSection/>
      <Suspense fallback={<TopGamesSkeleton/>}>
        <TopGamesSection/>
      </Suspense>
    </main>
  );
}
