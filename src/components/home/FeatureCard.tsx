import { cn } from "@/utils/utils";

interface FeatureCardProps {
  FeatureIcon: React.ReactNode;
  title: string;
  content: string;
  variant: "feature" | "subtle";
}

const FeatureCard = (props: FeatureCardProps) => {
  const { FeatureIcon, variant, title, content } = props;
  return (
    <div className="hover:scale-105 transition-all duration-200">
      <div className="flex flex-col bg-zinc-900 border border-zinc-800 p-10 rounded-lg card relative group h-70">
        <div className="group-hover:absolute -z-10 rounded-lg -inset-0.5 rotate-card"></div>
        <div
          className={cn(
            "relative w-12 h-12 bg-zinc-700/50 rounded-lg flex items-center justify-center mb-6",
            variant === "feature" && "bg-zinc-700/50",
            variant === "subtle" && "bg-purple-300"
          )}
        >
          {FeatureIcon}
        </div>
        <h3 className="relative text-xl text-zinc-200 mb-7">{title}</h3>
        <p className="relative text-zinc-400">{content}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
