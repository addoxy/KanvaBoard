import Button from "@/components/Button";
import { NotFoundIcon } from "@/components/Icons";
import Title from "@/components/Title";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function page() {
  const session = await getServerSession(authOptions);
  const link = session ? "/projects" : "/";

  return (
    <div className="flex flex-col items-center justify-center h-screen w-screen bg-zinc-900">
      <NotFoundIcon className="h-20 w-20 mb-10 text-violet-600" />
      <Title text="Page not found" variant="xl" className="mb-6" />
      <Link href={link}>
        <Button text="Return Home" variant="xl" />
      </Link>
    </div>
  );
}
