"use client";

import { ButtonPosition } from "@/types";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

interface ButtonProps {
    position: ButtonPosition;
    classNameSignIn?: string;
    classNameSignUp?: string;
}

const AuthButtons = ({ position, classNameSignIn, classNameSignUp }: ButtonProps) => {
    const buttons = [
        { component: <SignedOut><SignInButton>Sign In</SignInButton></SignedOut>, className: classNameSignIn },
        { component: <SignUpButton>Create Account</SignUpButton>, className: classNameSignUp },
    ];

    if (position === ButtonPosition.REVERSE) {
        buttons.reverse();
    }

    return (
        <ul className="flex items-center gap-4">
            {buttons.map((button, index) => (
                <li key={index} className={button.className}>
                    {button.component}
                </li>
            ))}
        </ul>
    );
};

export default AuthButtons;

