"use client";

import { SignedOut, SignInButton, UserButton, useSession, SignUpButton } from "@clerk/nextjs";

export default function UserMenu() {
    const { session } = useSession();

  return (
    <nav>
      {session ? (
        <UserButton afterSwitchSessionUrl="/" />
      ) : ( 
        <ul className="flex items-center gap-4">
             <li className="hover:text-orange-500 transition-all duration-300 ease-in-out">
                <SignedOut>
                    <SignInButton>Sign In</SignInButton>
                </SignedOut>
            </li>
            <li className="bg-black border-white border-2 hover:bg-orange-500 hover:text-black hover:border-orange-500 p-2 rounded-full transition-all duration-300 ease-in-out">
              <SignUpButton>Create Account</SignUpButton>
            </li>
        </ul>
      )}
    </nav>
  );
}