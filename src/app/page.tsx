import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="flex flex-col text-xl text-white">
      <pre>{JSON.stringify(session)}</pre>
      {!session && <p>Not logged in!</p>}
    </div>
  );
}
