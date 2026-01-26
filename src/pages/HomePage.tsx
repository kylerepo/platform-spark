import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Eye, 
  Zap, 
  BarChart3, 
  Lock, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Star,
  Play
} from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import dashboardPreview from "@/assets/dashboard-preview.png";
import testimonial1 from "@/assets/testimonial-1.jpg";
import testimonial2 from "@/assets/testimonial-2.jpg";
import testimonial3 from "@/assets/testimonial-3.jpg";

const features = [
  {
    icon: Shield,
    title: "Invisible Watermarking",
    description: "Embed imperceptible forensic markers that survive compression, cropping, and filtering.",
  },
  {
    icon: Eye,
    title: "AI-Powered Monitoring",
    description: "24/7 automated scanning across 200+ platforms to find your stolen content instantly.",
  },
  {
    icon: Zap,
    title: "One-Click Takedowns",
    description: "Automated DMCA submissions with pre-filled templates and real-time tracking.",
  },
];

const stats = [
  { value: "50K+", label: "Creators Protected" },
  { value: "2M+", label: "Takedowns Processed" },
  { value: "98%", label: "Success Rate" },
  { value: "$15M+", label: "Revenue Protected" },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "OnlyFans Creator",
    image: testimonial1,
    quote: "CreatorShield recovered over $12,000 in stolen content revenue in just 3 months. The peace of mind is priceless.",
    stat: "$12K+ recovered",
  },
  {
    name: "Marcus Rivera",
    role: "Fansly Creator",
    image: testimonial2,
    quote: "I used to spend hours hunting down stolen content. Now it's automated and I can focus on creating.",
    stat: "15 hrs/week saved",
  },
  {
    name: "Emily Tanaka",
    role: "Patreon Creator",
    image: testimonial3,
    quote: "The invisible watermarking caught a subscriber selling my content. Without it, I never would have known.",
    stat: "89% less piracy",
  },
];

const trustedPlatforms = [
  "OnlyFans", "Fansly", "Patreon", "ManyVids", "JustForFans", "LoyalFans"
];

export default function HomePage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Background */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 grid-pattern opacity-30" />
        </div>

        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                <span className="text-sm text-muted-foreground">Trusted by 50,000+ creators worldwide</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Protect Your{" "}
                <span className="gradient-text">Exclusive Content</span>{" "}
                With AI-Powered Security
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl">
                Advanced watermarking, automated monitoring, and streamlined DMCA protection 
                for subscription creators. Stop content theft before it costs you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Link to="/signup">
                  <Button variant="hero" size="xl" className="w-full sm:w-auto">
                    Start Free Trial (14 Days)
                    <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button variant="hero-outline" size="xl" className="group">
                  <Play className="h-5 w-5 group-hover:text-primary" />
                  View Demo
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                No credit card required • Setup in 2 minutes • Cancel anytime
              </p>
            </div>

            {/* Right: Dashboard Preview */}
            <div className="relative animate-fade-in lg:animate-slide-in-right">
              <div className="relative glass-card rounded-2xl p-2 shadow-glow">
                <img 
                  src={dashboardPreview} 
                  alt="CreatorShield Dashboard" 
                  className="rounded-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-xl p-4 shadow-lg animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-success/20 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-success" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Takedown Successful</p>
                      <p className="text-xs text-muted-foreground">Content removed in 2hrs</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="py-12 border-y border-border bg-card/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
            <p className="text-sm text-muted-foreground">Compatible with:</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {trustedPlatforms.map((platform) => (
                <span 
                  key={platform} 
                  className="text-muted-foreground hover:text-foreground transition-colors font-medium"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 gradient-radial">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="stat-card text-center p-6 rounded-xl glass-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need to{" "}
              <span className="gradient-text">Protect Your Work</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              From invisible watermarking to automated takedowns, we've got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="feature-card p-8 rounded-2xl glass-card border border-border"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features">
              <Button variant="outline" size="lg">
                Explore All Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Trusted by{" "}
              <span className="gradient-text">Top Creators</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See how creators are protecting their income with CreatorShield.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.name}
                className="p-8 rounded-2xl glass-card border border-border"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <span className="text-sm font-medium text-primary">{testimonial.stat}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 gradient-radial opacity-50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to{" "}
              <span className="gradient-text">Protect Your Income?</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 50,000+ creators who trust CreatorShield to safeguard their exclusive content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-6 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary w-full sm:w-80"
              />
              <Button variant="hero" size="xl">
                Start Free Trial
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              No credit card required for trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
