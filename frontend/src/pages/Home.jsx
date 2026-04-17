
import Hero from "../components/home/Hero";
import ShowcaseSection from "../components/home/Showcasesection";
import ProgressSection from "../components/home/ProgressSection";
import CreativeHero from "../components/home/CreativeHero";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div
      className="bg-[#f5f7fa]"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <Hero />
      <CreativeHero />
      <ShowcaseSection />
      <ProgressSection />
    </motion.div>
  );
}

