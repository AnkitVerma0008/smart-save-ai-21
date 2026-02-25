import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, PieChart } from "lucide-react";

interface HeroSectionProps {
  onStart: () => void;
}

const HeroSection = ({ onStart }: HeroSectionProps) => {
  return (
    <section className="gradient-hero min-h-[70vh] flex items-center justify-center relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-accent/10 blur-3xl" />

      <div className="container mx-auto px-6 py-20 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 border border-secondary/20 mb-8">
          <Shield className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-secondary">AI-Powered Financial Planning</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 font-display leading-tight">
          Smart Budget AI
        </h1>
        <p className="text-xl md:text-2xl text-primary-foreground/70 mb-4 font-light max-w-2xl mx-auto">
          Intelligent Budget & Investment Planner
        </p>
        <p className="text-lg md:text-xl text-secondary font-medium mb-10">
          Track Smart. Save Smart. Invest Smart.
        </p>

        <Button variant="hero" size="lg" className="text-base px-10 py-6 rounded-xl" onClick={onStart}>
          Get Started
          <TrendingUp className="w-5 h-5 ml-2" />
        </Button>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {[
            { icon: TrendingUp, label: "Smart Tracking", desc: "Real-time budget insights" },
            { icon: Shield, label: "AI Suggestions", desc: "Intelligent saving tips" },
            { icon: PieChart, label: "Visual Reports", desc: "Beautiful expense charts" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10">
              <item.icon className="w-6 h-6 text-secondary" />
              <span className="font-semibold text-primary-foreground text-sm">{item.label}</span>
              <span className="text-primary-foreground/50 text-xs">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
