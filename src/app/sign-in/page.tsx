import Image from "next/image";

import logo from "@/../public/logo.png";
import Spacer from "@/components/Spacer";
import SignInButton from "./components/SignInButton";

export default function page() {
  return (
    <div className="grid place-items-center mb-48">
      <Spacer variant="xl" />
      <Image height={120} width={120} src={logo} alt="logo" className="mb-16" />
      <div className="w-150 h-120 bg-zinc-800/40 border border-zinc-700 mb-14 pt-14 pb-20 rounded-2xl grid place-items-center">
        <span className="mb-12 text-zinc-300 text-lg">Sign in with</span>
        <div className="flex flex-col gap-y-4">
          <SignInButton name="Google" brand="google" />
          <SignInButton name="Github" brand="github" />
          <SignInButton name="Discord" brand="discord" />
        </div>
      </div>
    </div>
  );
}
