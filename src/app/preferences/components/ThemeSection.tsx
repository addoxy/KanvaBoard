import Title from "@/components/Title";
import Toggle from "./Toggle";

const ThemeSection = () => {
  return (
    <div className="flex flex-col pt-18 border-b-zinc-700/50">
      <Title text="Theme" variant="lg" className="mb-6" />
      <div className="flex justify-between">
        <span className="text-sm text-zinc-400 mb-3">Dark Mode</span>
        <Toggle />
      </div>
      <span className="text-sm text-zinc-500">
        Customize the color scheme of your interface
      </span>
    </div>
  );
};

export default ThemeSection;
