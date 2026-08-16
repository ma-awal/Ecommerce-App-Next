 
import HeroSection from "@/components/HeroSection";
import FeatureStrip from "@/components/FeatureStrip";
import ColorShowcase from "@/components/ColorShowcase";
export default function Home() {
  return (
    <main className="flex-1 flex flex-col">
      <HeroSection />
      <FeatureStrip />
      <ColorShowcase />
    </main>
  );
}