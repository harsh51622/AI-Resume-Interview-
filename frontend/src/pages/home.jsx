import Navbar from "../components/SmallComponents/Navbar";
import PdfSaved from "../components/PdfSaved";
import HowItWorks from "../components/SmallComponents/HowItWorks";
import Features from "../components/SmallComponents/Features";
import Categories from "../components/SmallComponents/Categories";
import CTA from "../components/SmallComponents/CTA";
import Footer from "../components/SmallComponents/Footer";

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen">
  
      <PdfSaved />
      <HowItWorks />
      <Features />
      <Categories />
      <CTA />
   
    </div>
  );
}