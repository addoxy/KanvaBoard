import Link from "next/link";
import { Logo } from "../Icons";

const Footer = () => {
  return (
    <>
      <div className="grid place-items-center">
        <Link href="/" className="mb-3 text-center flex items-center">
          <Logo className="w-5 h-5 mr-3" />
          <span className="text-zinc-200">KanvaBoard</span>
        </Link>
        <p className="text-zinc-500 text-center">
          © 2023 Addoxy. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
