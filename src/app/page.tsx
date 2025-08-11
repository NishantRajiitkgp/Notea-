import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeroHeader } from "@/components/header";
import HeroSection  from "@/components/hero-section";

export default function Home() {
  return (
    <main>
      <HeroHeader />
      <HeroSection />
    </main>

  );
}
