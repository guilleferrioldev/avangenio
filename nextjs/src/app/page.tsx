import { TopGamesSection, Header, StreamingSection } from "@/components";

export default async function Home() {
  return (
    <main className="bg-my-dark-violet h-screen overflow-y-scroll overflow-x-hidden">
      <Header/>
      <StreamingSection/>
      <TopGamesSection/>
    </main>
  );
}
