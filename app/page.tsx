import { Hero } from "@/components/sections/Hero";
import { LogoMarquee } from "@/components/sections/LogoMarquee";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { Pricing } from "@/components/sections/Pricing";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <BentoGrid />
      <Pricing />
      <Faq />
      <FinalCta />
    </>
  );
}
