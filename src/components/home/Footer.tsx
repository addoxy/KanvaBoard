import Link from "next/link";

const Footer = () => {
  return (
    <>
      <div className="grid place-items-center">
        <Link href="/" className="text-zinc-200 mb-2">
          KanvaBoard
        </Link>
        <p className="text-zinc-500">© 2023 Addoxy. All rights reserved.</p>
      </div>
    </>
  );
};

export default Footer;
