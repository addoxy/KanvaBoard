"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../Button";

const Navbar = () => {
  const { data: session } = useSession();

  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/" className="flex">
        {/* add logo here */}
        <span className="text-zinc-200 font-medium">KanvaBoard</span>
      </Link>
      <Link href="/sign-in">
        <Button variant="md" text={session ? "App" : "Sign In"} />
      </Link>
    </div>
  );
};

export default Navbar;
