import { Header } from "@/components";

export default function Home() {
  return (
    <>
      <Header/>
      <section className="p-10 text-center">
        <h1 className="text-4xl font-bold">Welcome to Gamor</h1>
        <p className="text-xl">
          Gamor is a test for nextjs
        </p>
        </section>
    </>
  );
}
