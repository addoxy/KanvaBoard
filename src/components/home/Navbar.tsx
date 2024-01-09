import Link from "next/link";
import Button from "../Button";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center">
      <Link href="/" className="flex">
        {/* add logo here */}
        <span className="text-zinc-200 font-medium">KanvaBoard</span>
      </Link>
      <Button variant="md" text="Sign In" />
    </div>
  );
};

export default Navbar;
