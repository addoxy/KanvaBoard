import logo from "@/../public/logo.png";
import Title from "@/components/Title";
import Image from "next/image";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen">
      <Image src={logo} alt="logo" className="mb-20" />
      <Title text="Page not found" variant="xl" className="mb-6" />
      <Link href="/">
        <button className="bg-violet-700 text-zinc-300 text-sm shrink-0 w-44 h-11 rounded-lg font-medium">
          Return Home
        </button>
      </Link>
    </div>
  );
}
