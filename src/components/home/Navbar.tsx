"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../Button";
import { Logo } from "../Icons";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/" className="flex items-center">
        <Logo className="w-6 h-6 mr-3" />
        <span className="text-zinc-200 font-medium">KanvaBoard</span>
      </Link>
      <Link href="/sign-in">
        <Button variant="md" text={session ? "App" : "Sign In"} />
      </Link>
    </div>
  );
};

export default Navbar;
