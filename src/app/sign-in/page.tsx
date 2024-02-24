import SignInButton from "./components/SignInButton";

export default function page() {
  return (
    <div className="grid place-items-center h-screen">
      <div className="flex flex-col gap-y-10 items-center">
        <div className="flex items-center">
          <span className="text-zinc-300 font-normal text-xl">
            Sign in to KanvaBoard
          </span>
        </div>
        <div className="flex flex-col gap-y-3">
          <SignInButton name="Google" brand="google" />
          <SignInButton name="Github" brand="github" />
          <SignInButton name="Discord" brand="discord" />
        </div>
      </div>
    </div>
  );
}
