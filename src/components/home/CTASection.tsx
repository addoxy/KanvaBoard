"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

const CTASection = () => {
  const { data: session } = useSession();

  return (
    <div className="grid place-items-center bg-zinc-925 border border-zinc-800 rounded-lg sm:p-20 p-10">
      <h3 className="text-zinc-300 text-center text-2xl sm:text-3xl font-medium mb-3">
        Get{" "}
        <span className="bg-gradient-to-r from-purple-700 to-rose-700 inline-block text-transparent bg-clip-text">
          KanvaBoard
        </span>{" "}
        today
      </h3>
      <p className="text-zinc-400 leading-6 text-center mb-10">
        and experience the minimalist approach to project management.
      </p>
      <Link href="/sign-in">
        <button className="bg-violet-700 text-zinc-300 shrink-0 font-medium transition-all delay-100 duration-200 ease-in-out hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50 w-44 h-11 rounded-lg">
          {session ? "App" : "Get started"}
        </button>
      </Link>
    </div>
  );
};

export default CTASection;
