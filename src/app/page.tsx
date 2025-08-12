import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/header";
import HeroSection  from "@/components/hero-section";
import Features from "@/components/features-1";
import CallToAction from "@/components/call-to-action";
import FooterSection from "@/components/footer";


// The pnpm dlx shadcn@latest add ... command just means:
//"Run shadcn/ui CLI using pnpm and add this component to your project."
// npx shadcn@latest add https://tailark.com/r/hero-section-2.json

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
      <Features />
      <CallToAction />
      <FooterSection />
    </main>

  );
}
