import { useEffect, startTransition } from 'react';
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { CustomCursor } from './components/CustomCursor';
import { SoundToggle } from './components/SoundToggle';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';
import { KonkanBackground } from './components/KonkanBackground';
import { FishOverlay } from './components/FishOverlay';
import { useStore } from './store/useStore';
import { toggleSound } from './lib/sound';
import UnderwaterHero from './sections/UnderwaterHero';
import SurfaceTransition from './sections/SurfaceTransition';
import BrandHero from './sections/BrandHero';
import SignatureDish from './sections/SignatureDish';
import CoastalMenu from './sections/CoastalMenu';
import BuildYourPlate from './sections/BuildYourPlate';
import FromOurKitchen from './sections/FromOurKitchen';
import CookingJourney from './sections/CookingJourney';
import FoodGallery from './sections/FoodGallery';
import OrderSection from './sections/OrderSection';

export default function App() {
  const loaded = useStore((s) => s.loaded);
  const soundOn = useStore((s) => s.soundOn);
  const lang = useStore((s) => s.lang);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      startTransition(() => useStore.getState().setLoaded(true));
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.body.dataset.lang = lang;
  }, [lang]);

  useEffect(() => {
    toggleSound(soundOn);
  }, [soundOn]);

  return (
    <div id="top" className="relative bg-abyss text-cream min-h-screen overflow-x-clip">
      <LoadingScreen />
      {loaded && (
        <>
          <CustomCursor />
          <KonkanBackground />
          <FishOverlay />
          <SoundToggle />
          <Navbar />
          <CartDrawer />
          <main className="relative z-10">
            <UnderwaterHero />
            <SurfaceTransition />
            <BrandHero />
            <SignatureDish />
            <CoastalMenu />
            <BuildYourPlate />
            <FromOurKitchen />
            <CookingJourney />
            <FoodGallery />
            <OrderSection />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}