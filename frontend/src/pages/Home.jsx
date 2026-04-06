import Hero from "../components/home/Hero";
import ShowcaseSection from "../components/home/Showcasesection";
import ProgressSection from "../components/home/ProgressSection";
import CreativeHero from "../components/home/CreativeHero";

export default function Home() {
  return (
    <div className="bg-[#f5f7fa]">
      <Hero />
      <CreativeHero />
      <ShowcaseSection />
      <ProgressSection />
    </div>
  );
}
