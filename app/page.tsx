import OneTapComponent from '@/components/website/auth/google-one-tap';
import FAQSection from '@/components/website/landing-page/faq-section';
import FeaturesSection from '@/components/website/landing-page/features-section';
import FinalCTASection from '@/components/website/landing-page/final-cta-section';
import HeroSection from '@/components/website/landing-page/hero-section';
import HowItWorksSection from '@/components/website/landing-page/how-it-works-section';
import PricingSection from '@/components/website/landing-page/pricing-section';
import ProblemSection from '@/components/website/landing-page/problem-section';
import SocialProofSection from '@/components/website/landing-page/social-proof-section';
import SolutionSection from '@/components/website/landing-page/solution-section';
import TestimonialSection from '@/components/website/landing-page/testimonial-section';
import { Metadata } from 'next';

// export const metadata: Metadata = {
//     title: 'Home', // Will be rendered as "Home | Lunaria" due to the template
//     description: 'Take control of your financial future with Lunaria. Smart budgeting, investing, and money management tools all in one place.',
// };

export default function Home() {
    return (
        <div>
            <OneTapComponent />
            <HeroSection />
            <ProblemSection />
            <SolutionSection />
            <SocialProofSection />
            <FeaturesSection />
            <PricingSection />
            <TestimonialSection />
            <HowItWorksSection />
            <FAQSection />
            <FinalCTASection />
        </div>
    );
}
