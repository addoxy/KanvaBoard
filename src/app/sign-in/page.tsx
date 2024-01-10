import { Logo } from "@/components/Icons";
import Spacer from "@/components/Spacer";
import SignInButton from "./components/SignInButton";

export default function page() {
  return (
    <div className="grid place-items-center mb-48 px-4 sm:px-0">
      <Spacer variant="xl" />
      <div className="flex items-center mb-20">
        <Logo className="w-8 h-8 mr-3" />
        <span className="text-zinc-200 font-medium text-2xl">KanvaBoard</span>
      </div>
      <div className="lg:w-150 w-full h-120 bg-zinc-900 border border-zinc-700 mb-14 pt-14 pb-20 rounded-2xl grid place-items-center sm:w-130">
        <span className="mb-12 text-zinc-300 text-lg">Sign in with</span>
        <div className="flex flex-col place-items-center gap-y-4 w-full px-12 sm:px-0">
          <SignInButton name="Google" brand="google" />
          <SignInButton name="Github" brand="github" />
          <SignInButton name="Discord" brand="discord" />
        </div>
      </div>
    </div>
  );
}
