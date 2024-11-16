import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header>
      <h1>Gamor</h1>
      <UserButton afterSwitchSessionUrl="/" />
    </header>
  );
}