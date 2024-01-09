import Divider from "@/components/Divider";
import Spacer from "@/components/Spacer";
import CTASection from "@/components/home/CTASection";
import FeatureSection from "@/components/home/FeatureSection";
import Footer from "@/components/home/Footer";
import HeroSection from "@/components/home/HeroSection";
import Navbar from "@/components/home/Navbar";

export default async function Home() {
  return (
    <div className="px-20 pt-6 flex flex-col">
      <Navbar />
      <Spacer variant="xs" />
      <Divider className="bg-zinc-900" />
      <Spacer variant="xl" />
      <div className="grid place-items-center">
        <HeroSection />
        <FeatureSection />
        <CTASection />
      </div>
      <Divider className="bg-zinc-900" />
      <Spacer variant="xs" />
      <Footer />
      <Spacer variant="xs" />
    </div>
  );
}
