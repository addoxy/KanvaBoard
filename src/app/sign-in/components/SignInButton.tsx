"use client";

import { DiscordIcon, GithubIcon, GoogleIcon } from "@/components/Icons";
import { signIn } from "next-auth/react";

interface SignInButtonProps {
  name: string;
  brand: string;
}

const SignInButton = (props: SignInButtonProps) => {
  const { name, brand } = props;
  return (
    <button
      className="lg:w-104 sm:w-84 w-full bg-zinc-800/40 border border-zinc-700 text-zinc-300 flex items-center justify-center py-6 rounded-xl gap-x-7 hover:bg-zinc-800/90"
      onClick={() => signIn(brand)}
    >
      {brand === "google" && <GoogleIcon className="h-8 w-8 text-zinc-300" />}
      {brand === "github" && <GithubIcon className="h-8 w-8 text-zinc-300" />}
      {brand === "discord" && <DiscordIcon className="h-8 w-8 text-zinc-300" />}
      {name}
    </button>
  );
};

export default SignInButton;
