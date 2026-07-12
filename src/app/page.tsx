import Navbar from '@/components/layout/Navbar';
import Hero from '@/components/hero/Hero';
import FeaturedGames from '@/components/sections/FeaturedGames';

export default function Home() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <Hero />
      <FeaturedGames />
    </main>
  );
}