import Navbar from "./component/Navbar";
import HeroSection from "./component/HeroSection";
import LeadForm from "./component/LearForm/LeadForm";
import Carousel from "./component/Crousel";
import WhyTrade from "./component/WhyTrade";
import Footer from "./component/Footer";
import AnimationWrapper from "./component/AnimationWrapper";

export default function Home() {
  return (
    <>
      <Navbar />

      <AnimationWrapper>
        <HeroSection />
      </AnimationWrapper>

      <AnimationWrapper>
        <LeadForm />
      </AnimationWrapper>

      <AnimationWrapper>
        <Carousel />
      </AnimationWrapper>

      <AnimationWrapper>
        <WhyTrade />
      </AnimationWrapper>

      <AnimationWrapper>
        <Footer />
      </AnimationWrapper>
    </>
  );
}
