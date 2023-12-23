"use client";

import { signIn } from "next-auth/react";

export default function page() {
  return (
    <div className="flex flex-col">
      <button
        onClick={() => signIn("google")}
        className="w-40 py-4 bg-blue-200 text-zinc-800"
      >
        Google
      </button>
      <button
        onClick={() => signIn("github")}
        className="w-40 py-4 bg-violet-200 text-zinc-800"
      >
        Github
      </button>
      <button
        onClick={() => signIn("discord")}
        className="w-40 py-4 bg-zinc-200 text-zinc-800"
      >
        Discord
      </button>
    </div>
  );
}
