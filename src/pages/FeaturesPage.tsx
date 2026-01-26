import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Eye, 
  Zap, 
  BarChart3, 
  Lock, 
  Cloud,
  Fingerprint,
  Globe,
  FileCheck,
  Scale,
  Bell,
  Layers,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const featureCategories = [
  {
    id: "protection",
    title: "Content Protection",
    description: "Advanced watermarking technology that survives any manipulation",
    icon: Shield,
    color: "primary",
    features: [
      {
        title: "Invisible QR/Data Matrix Watermarking",
        description: "Embed imperceptible forensic markers into every piece of content",
        benefit: "Trace stolen content back to source",
      },
      {
        title: "Platform-Specific Formatting",
        description: "Optimized presets for OnlyFans, Fansly, Patreon, and more",
        benefit: "Works perfectly on every platform",
      },
      {
        title: "Batch Processing (1000+ files)",
        description: "Drag and drop thousands of files for instant watermarking",
        benefit: "Save hours of manual work",
      },
      {
        title: "Custom Creator ID Embedding",
        description: "Unique identifiers with timestamps and metadata",
        benefit: "Prove ownership definitively",
      },
    ],
  },
  {
    id: "monitoring",
    title: "AI Monitoring",
    description: "24/7 automated scanning finds your content before you even know it's stolen",
    icon: Eye,
    color: "accent",
    features: [
      {
        title: "24/7 Web & Platform Scanning",
        description: "Continuous monitoring across 200+ platforms and sites",
        benefit: "Find stolen content automatically",
      },
      {
        title: "Visual & Audio Fingerprinting",
        description: "AI identifies your content even when cropped, filtered, or edited",
        benefit: "Detect even heavily modified versions",
      },
      {
        title: "Social Media Platform Coverage",
        description: "Dedicated crawlers for Twitter, Reddit, Telegram, and more",
        benefit: "Monitor where your content appears",
      },
      {
        title: "Real-Time Alert System",
        description: "Push notifications the moment a match is found",
        benefit: "Get notified immediately",
      },
    ],
  },
  {
    id: "enforcement",
    title: "DMCA Automation",
    description: "Streamlined takedown process with legal-grade templates",
    icon: Zap,
    color: "success",
    features: [
      {
        title: "Pre-Filled Legal Templates",
        description: "100+ jurisdiction-specific templates ready to go",
        benefit: "Submit takedowns in minutes",
      },
      {
        title: "Multi-Platform Submission",
        description: "Submit to 10+ platforms simultaneously",
        benefit: "Cover all infringing sites at once",
      },
      {
        title: "Case Tracking Dashboard",
        description: "Real-time status updates on every takedown request",
        benefit: "Monitor progress of every case",
      },
      {
        title: "Counter-Notice Handling",
        description: "Pre-built responses and guidance for disputes",
        benefit: "Respond to disputes professionally",
      },
    ],
  },
  {
    id: "analytics",
    title: "Analytics & Reports",
    description: "Deep insights into your content protection performance",
    icon: BarChart3,
    color: "warning",
    features: [
      {
        title: "Infringement Heat Maps",
        description: "Visualize where your content is being stolen",
        benefit: "Identify problem platforms",
      },
      {
        title: "Revenue Loss Estimates",
        description: "Calculate the financial impact of content theft",
        benefit: "Quantify financial impact",
      },
      {
        title: "Success Rate Analytics",
        description: "Track takedown success rates by platform",
        benefit: "Measure protection effectiveness",
      },
      {
        title: "Legal-Ready Evidence Packages",
        description: "Auto-generated documentation for legal action",
        benefit: "Build strong legal cases",
      },
    ],
  },
];

const additionalFeatures = [
  { icon: Lock, title: "End-to-End Encryption", description: "Your content is always protected with military-grade encryption" },
  { icon: Cloud, title: "Cloud Storage Integration", description: "Direct import from Dropbox, Google Drive, OneDrive" },
  { icon: Fingerprint, title: "Facial Recognition", description: "Optional face matching for identity verification" },
  { icon: Globe, title: "200+ Platform Coverage", description: "Monitoring across social media, tube sites, forums, and file hosts" },
  { icon: FileCheck, title: "Compression Resilience", description: "Watermarks survive multiple re-encodes and compressions" },
  { icon: Scale, title: "Legal Consultation Network", description: "Access to partner attorneys for complex cases" },
  { icon: Bell, title: "Custom Alert Thresholds", description: "Set your own confidence levels for notifications" },
  { icon: Layers, title: "API Access", description: "Full REST API for custom integrations and automation" },
];

export default function FeaturesPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="py-24 gradient-radial">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Everything You Need to{" "}
              <span className="gradient-text">Protect Your Content</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              From invisible watermarking to automated takedowns, CreatorShield provides 
              comprehensive protection for your exclusive content.
            </p>
            <Link to="/signup">
              <Button variant="hero" size="lg">
                Start Free Trial
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Feature Categories */}
      {featureCategories.map((category, categoryIndex) => (
        <section 
          key={category.id} 
          id={category.id}
          className={`py-24 ${categoryIndex % 2 === 0 ? '' : 'bg-card/50'}`}
        >
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Info */}
              <div className={categoryIndex % 2 === 1 ? 'lg:order-2' : ''}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-6">
                  <category.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">{category.title}</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{category.description}</h2>
                <div className="space-y-6 mt-8">
                  {category.features.map((feature) => (
                    <div key={feature.title} className="flex gap-4">
                      <div className="mt-1">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-1">{feature.title}</h3>
                        <p className="text-muted-foreground text-sm mb-1">{feature.description}</p>
                        <p className="text-sm text-primary">{feature.benefit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual */}
              <div className={`${categoryIndex % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="glass-card rounded-2xl p-8 border border-border">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                    <category.icon className="h-24 w-24 text-primary/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ))}

      {/* Additional Features Grid */}
      <section className="py-24" id="integrations">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Plus Everything Else You Need
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful features that make content protection seamless.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {additionalFeatures.map((feature) => (
              <div 
                key={feature.title}
                className="p-6 rounded-xl glass-card border border-border feature-card"
              >
                <feature.icon className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Protect Your Content?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your 14-day free trial and experience the full power of CreatorShield.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button variant="hero" size="lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
