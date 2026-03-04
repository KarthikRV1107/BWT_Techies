import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DemoSection from "@/components/DemoSection";
import TeamSection from "@/components/TeamSection";
import PitchSection from "@/components/PitchSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TeamSection />
      <PitchSection />
      <Footer />
    </div>
  );
};

export default Index;
