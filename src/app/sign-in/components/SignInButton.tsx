"use client";

import { DiscordIcon, GithubIcon, GoogleIcon } from "@/components/Icons";
import { cn } from "@/utils/utils";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  name: string;
  brand: string;
}

const SignInButton = (props: SignInButtonProps) => {
  const { name, brand } = props;
  return (
    <button
      className={cn(
        "w-80 py-4 flex items-center justify-center rounded-md text-zinc-300 gap-x-3 transition-all delay-100 duration-200 ease-in-out shadow-md",
        brand === "google" && "bg-violet-700/90 hover:bg-purple-700",
        brand !== "google" && "bg-zinc-800 hover:bg-zinc-700"
      )}
      onClick={() => signIn(brand)}
    >
      {brand === "google" && <GoogleIcon className="h-4 w-4" />}
      {brand === "github" && <GithubIcon className="h-4 w-4" />}
      {brand === "discord" && <DiscordIcon className="h-4 w-4" />}
      Continue with {name}
    </button>
  );
};

export default SignInButton;
