import logo from "@/../public/logo.png";
import Button from "@/components/Button";
import Title from "@/components/Title";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);
  const link = session ? "/projects" : "/";

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-zinc-900">
      <Image src={logo} alt="logo" className="mb-20" />
      <Title text="Page not found" variant="xl" className="mb-6" />
      <Link href={link}>
        <Button text="Return Home" variant="xl" />
      </Link>
    </div>
  );
}
