import Footer from "@/components/Footer";
import HeroSlider from "@/components/HeroSlider";
import Section01 from "@/components/Section01";
import Section02 from "@/components/Section02";
import Section03 from "@/components/Section03";
import Section04 from "@/components/Section04";
import Section05 from "@/components/Section05";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSlider />
      <Section01 />
      <Section02 />
      <Section03 />
      <Section04 />
      <Section05 />
      <Footer/>
    </main>
  );
}
