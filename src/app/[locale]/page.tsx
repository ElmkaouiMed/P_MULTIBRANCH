import { Hero } from "@/components/sections/Hero";
import { TrustBadges } from "@/components/sections/TrustBadges";
import { FleetGrid } from "@/components/sections/FleetGrid";
import { FindNearestBranch } from "@/components/sections/FindNearestBranch";
import { CorporateAccounts } from "@/components/sections/CorporateAccounts";
import { Testimonials } from "@/components/sections/Testimonials";
import { FaqSection } from "@/components/sections/FaqSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <FleetGrid limit={8} />
      <FindNearestBranch />
      <Testimonials />
      <CorporateAccounts />
      <FaqSection />
    </>
  );
}
