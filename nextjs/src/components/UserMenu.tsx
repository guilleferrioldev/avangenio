"use client";

import { UserButton, useSession } from "@clerk/nextjs";
import { ButtonPosition } from "@/types";
import { AuthButtons } from "@/components";

export default function UserMenu() {
    const { session } = useSession();

  return (
    <nav>
      {session ? (
        <UserButton afterSwitchSessionUrl="/" />
      ) : ( 
        <AuthButtons
          position={ButtonPosition.SORT}
          classNameSignIn="hover:text-orange-500 transition-all duration-300 ease-in-out"
          classNameSignUp="bg-black border-white border-2 hover:bg-orange-500 hover:text-black hover:border-orange-500 p-2 rounded-full transition-all duration-300 ease-in-out"
        />
      )}
    </nav>
  );
}