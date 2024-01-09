import {
  CustomizeFeatureIcon,
  DragFeatureIcon,
  SearchIcon,
  TemplateFeatureIcon,
} from "../Icons";
import Spacer from "../Spacer";
import FeatureCard from "./FeatureCard";

const FeatureSection = () => {
  return (
    <>
      <Spacer variant="xl" />
      <Spacer variant="xl" />
      <h2 className="font-medium text-3xl text-zinc-200 text-center w-200">
        <span className="bg-gradient-to-r from-purple-700 to-rose-700 inline-block text-transparent bg-clip-text">
          Features
        </span>{" "}
        You Will Love
      </h2>
      <Spacer variant="xl" />
      <div className="grid grid-cols-2 gap-x-10 px-50 gap-y-10">
        <FeatureCard
          FeatureIcon={
            <TemplateFeatureIcon className="w-6 h-6 text-zinc-300" />
          }
          title="Collection of templates"
          content="Simplify planning by leveraging a variety of ready-made templates tailored to different project needs"
        />
        <FeatureCard
          FeatureIcon={<SearchIcon className="w-6 h-6 text-zinc-300" />}
          title="Robust search"
          content="Quickly find the project you are looking for using our robust search feature and save the time spent scrolling through lists"
        />
        <FeatureCard
          FeatureIcon={<DragFeatureIcon className="w-6 h-6 text-zinc-300" />}
          title="Powerful drag and drop"
          content="Easily sort your tasks or columns using our easy-to-use and powerful drag and drop feature"
        />
        <FeatureCard
          FeatureIcon={
            <CustomizeFeatureIcon className="w-6 h-6 text-zinc-300" />
          }
          title="Make it your own"
          content="Tailor your experience with the wide variety of preferences, putting you in control of the app's look and feel"
        />
      </div>
      <Spacer variant="xl" />
      <Spacer variant="xl" />
      <h2 className="font-medium text-3xl text-zinc-200 text-center w-200">
        <span>Subtle Features,</span>{" "}
        <span className="bg-gradient-to-r from-purple-700 to-rose-700 inline-block text-transparent bg-clip-text">
          Meaningful
        </span>{" "}
        Impact
      </h2>
      <Spacer variant="xl" />
    </>
  );
};

export default FeatureSection;
