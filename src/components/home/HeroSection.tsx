"use client";

import hero from "@/../public/hero.png";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowIcon } from "../Icons";
import Spacer from "../Spacer";

const HeroSection = () => {
  const { data: session } = useSession();

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-medium sm:text-4xl md:text-6xl text-zinc-200 text-center lg:w-200 w-full text-3xl">
        The{" "}
        <span className="bg-gradient-to-r from-purple-700 to-rose-700 inline-block text-transparent bg-clip-text">
          Minimal
        </span>{" "}
        Approach to Project Management
      </h1>
      <Spacer variant="sm" />
      <p className="text-zinc-400 leading-6 lg:w-170 w-full text-center">
        Experience the power of minimalism in project management with our
        streamlined approach, ensuring efficiency and optimal results every step
        of the way.
      </p>
      <Spacer variant="md" />
      <div className="relative group">
        <div className="absolute -inset-0.5 opacity-80 bg-gradient-to-r from-purple-700 to-rose-700 rounded-lg blur group-hover:opacity-100 transition duration-1000 group-hover:duration-200 group-hover:blur-md" />
        <Link href="/sign-in">
          <button className="bg-zinc-200 group-hover:bg-zinc-50 transition-all duration-200 ease-in-out relative text-zinc-900 shrink-0 font-medium w-50 h-11 rounded-lg flex justify-center items-center gap-x-1">
            <span>{session ? "App" : "Get Started"}</span>
            {!session && (
              <ArrowIcon className="w-5 h-5 text-zinc-900 rotate-90 group-hover:translate-x-2 transition-all delay-100 duration-500 ease-in-out" />
            )}
          </button>
        </Link>
      </div>
      <Spacer variant="xl" />
      <Image
        src={hero}
        alt="hero"
        className="rounded-lg border border-zinc-800 shadow-lg shadow-purple-900 sm:w-11/12 w-full max-w-6xl"
      />
    </div>
  );
};

export default HeroSection;
