import { Header, StreamingSection } from "@/components";

export default function Home() {
  return (
    <main className="bg-my-dark-violet h-screen overflow-y-scroll overflow-x-hidden">
      <Header/>
      <StreamingSection/>
    </main>
  );
}
