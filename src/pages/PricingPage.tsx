import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  CheckCircle2, 
  X,
  ArrowRight,
  Zap,
  HelpCircle
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Starter",
    description: "For new creators with limited content",
    monthlyPrice: 19,
    yearlyPrice: 190,
    popular: false,
    features: [
      { text: "50 watermarking credits/month", included: true },
      { text: "500 AI scans/month", included: true },
      { text: "5 automated takedowns/month", included: true },
      { text: "Basic monitoring (3 platforms)", included: true },
      { text: "Email support (48-hour response)", included: true },
      { text: "1GB storage", included: true },
      { text: "Batch processing", included: false },
      { text: "API access", included: false },
      { text: "Custom watermark positioning", included: false },
      { text: "Team accounts", included: false },
    ],
  },
  {
    name: "Pro",
    description: "For full-time creators with growing libraries",
    monthlyPrice: 49,
    yearlyPrice: 490,
    popular: true,
    features: [
      { text: "300 watermarking credits/month", included: true },
      { text: "3,000 AI scans/month", included: true },
      { text: "30 automated takedowns/month", included: true },
      { text: "Advanced monitoring (10 platforms)", included: true },
      { text: "Priority email support (24-hour)", included: true },
      { text: "25GB storage", included: true },
      { text: "Batch processing (up to 100 files)", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Custom watermark positions", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Enterprise",
    description: "For studios and top 1% creators",
    monthlyPrice: 149,
    yearlyPrice: 1490,
    popular: false,
    features: [
      { text: "Unlimited watermarking", included: true },
      { text: "15,000 AI scans/month", included: true },
      { text: "150 automated takedowns/month", included: true },
      { text: "Comprehensive monitoring (25+ platforms)", included: true },
      { text: "24/7 Priority chat/phone support", included: true },
      { text: "100GB storage", included: true },
      { text: "Team accounts (3 users)", included: true },
      { text: "Full API access", included: true },
      { text: "Custom legal template creation", included: true },
      { text: "White-label reports", included: true },
    ],
  },
];

const addons = [
  { name: "Extra Takedowns", price: "$2 each" },
  { name: "Additional Storage", price: "$5/10GB/month" },
  { name: "Dedicated IP for Crawling", price: "$20/month" },
  { name: "Legal Consultation Hours", price: "$150/hour" },
];

const faqs = [
  {
    question: "What counts as a scan?",
    answer: "A scan is when our AI searches one platform for matches to your content. Each piece of content you monitor counts toward your monthly scan limit. Scans are optimized to check multiple platforms efficiently.",
  },
  {
    question: "How does watermarking work?",
    answer: "Our invisible forensic watermarking embeds unique identifiers into your content that are imperceptible to viewers but can be extracted to prove ownership. Watermarks survive cropping, compression, and filtering.",
  },
  {
    question: "Can I upgrade or downgrade my plan?",
    answer: "Yes! You can change your plan at any time. Upgrades take effect immediately with prorated billing. Downgrades take effect at the start of your next billing cycle.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day free trial so you can test the platform risk-free. After the trial, we provide prorated refunds within the first 7 days of a paid subscription.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! All plans include a 14-day free trial with full access to features. No credit card required to start.",
  },
];

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div>
      {/* Hero */}
      <section className="py-24 gradient-radial">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Choose the plan that fits your content protection needs. 
              All plans include a 14-day free trial.
            </p>

            {/* Billing Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={!isYearly ? "font-medium" : "text-muted-foreground"}>
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
              />
              <span className={isYearly ? "font-medium" : "text-muted-foreground"}>
                Yearly
              </span>
              {isYearly && (
                <span className="ml-2 px-3 py-1 rounded-full bg-success/20 text-success text-sm font-medium">
                  Save 17%
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 -mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div 
                key={plan.name}
                className={`relative p-8 rounded-2xl glass-card border ${
                  plan.popular 
                    ? 'border-primary shadow-glow pricing-popular' 
                    : 'border-border'
                }`}
              >
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? 'year' : 'month'}
                  </span>
                </div>

                <Link to="/signup" className="block mb-8">
                  <Button 
                    variant={plan.popular ? "hero" : "outline"} 
                    className="w-full"
                    size="lg"
                  >
                    Start Free Trial
                  </Button>
                </Link>

                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      ) : (
                        <X className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
                      )}
                      <span className={feature.included ? "" : "text-muted-foreground"}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add-ons */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Add-Ons</h2>
            <p className="text-muted-foreground">
              Customize your plan with additional features as needed.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {addons.map((addon) => (
              <div 
                key={addon.name}
                className="p-6 rounded-xl glass-card border border-border text-center"
              >
                <h4 className="font-semibold mb-2">{addon.name}</h4>
                <p className="text-primary font-bold">{addon.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">
              Have questions? We've got answers.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="glass-card rounded-xl border border-border px-6"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
              <Zap className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium text-primary">14-day free trial</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Protecting Your Content Today
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              No credit card required. Full access to all features during trial.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="xl">
                Start Free Trial
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
