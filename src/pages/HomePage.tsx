import { Hero3D } from '../components/Hero3D';
import { ProductDetailSection } from '../components/ProductDetailSection';
import { ArchedBanner } from '../components/ArchedBanner';
import { ColorBlockShowcase } from '../components/ColorBlockShowcase';
import { MenuSection } from '../components/MenuSection';
import { ZomatoOrderBanner } from '../components/ZomatoOrderBanner';
import { Footer } from '../components/Footer';

export function HomePage() {
  return (
    <main className="relative z-10">
      {/* MANA Dynamic Full-Bleed 3D Hero Section (Screenshots 1-4) */}
      <Hero3D />

      {/* MANA Product Detail & Daily Value Table Section (Screenshots 5 & 6) */}
      <ProductDetailSection />

      {/* MANA Arched Headline Banner Section (Screenshot 7) */}
      <ArchedBanner />

      {/* MANA 3-Column Color-Blocked Spectrum Carousel (Screenshot 8) */}
      <ColorBlockShowcase />

      {/* Full Coastal Menu with Instant Cart and Zomato Orders */}
      <MenuSection />

      {/* Zomato & Kitchen Delivery Banner */}
      <ZomatoOrderBanner />

      <Footer />
    </main>
  );
}
