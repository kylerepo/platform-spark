import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Video, 
  Users, 
  FileText,
  ArrowRight,
  Download,
  ExternalLink,
  Play
} from "lucide-react";

const resourceCategories = [
  {
    title: "Getting Started Guides",
    description: "Step-by-step tutorials to set up your protection",
    icon: BookOpen,
    items: [
      { title: "Quick Start: Your First Watermark", time: "5 min read" },
      { title: "Setting Up Automated Monitoring", time: "8 min read" },
      { title: "Submitting Your First DMCA Takedown", time: "6 min read" },
      { title: "Understanding Your Dashboard", time: "4 min read" },
    ],
  },
  {
    title: "Video Tutorials",
    description: "Watch and learn at your own pace",
    icon: Video,
    items: [
      { title: "Platform Overview Walkthrough", time: "12 min" },
      { title: "Advanced Watermarking Techniques", time: "18 min" },
      { title: "Maximizing Scan Efficiency", time: "10 min" },
      { title: "Building Evidence Packages", time: "15 min" },
    ],
  },
  {
    title: "Creator Success Stories",
    description: "Learn from creators who've recovered their content",
    icon: Users,
    items: [
      { title: "How Sarah Recovered $12K in Revenue", time: "Case Study" },
      { title: "Marcus's Journey: 0 to Full Protection", time: "Case Study" },
      { title: "Studio Success: Protecting 10K+ Assets", time: "Case Study" },
      { title: "The Power of Invisible Watermarks", time: "Case Study" },
    ],
  },
  {
    title: "Legal Resources",
    description: "DMCA guides, templates, and best practices",
    icon: FileText,
    items: [
      { title: "Complete DMCA Process Guide", time: "15 min read" },
      { title: "Platform-Specific Requirements", time: "10 min read" },
      { title: "Handling Counter-Notices", time: "8 min read" },
      { title: "When to Escalate to Legal Action", time: "12 min read" },
    ],
  },
];

const featuredArticles = [
  {
    category: "Protection Tips",
    title: "5 Ways Content Creators Lose Revenue to Piracy (And How to Stop It)",
    excerpt: "Content theft costs creators an estimated $2.5 billion annually. Learn the common vulnerabilities and how to protect yourself.",
    readTime: "7 min read",
  },
  {
    category: "Industry News",
    title: "2024 Content Protection Report: What's Changed?",
    excerpt: "Our annual analysis of piracy trends, successful takedown strategies, and emerging threats to creator content.",
    readTime: "12 min read",
  },
  {
    category: "Tutorial",
    title: "The Ultimate Guide to Invisible Watermarking",
    excerpt: "Everything you need to know about forensic watermarking technology and how to use it effectively.",
    readTime: "15 min read",
  },
];

const downloads = [
  { title: "DMCA Template Pack", description: "50+ legal templates", format: "PDF" },
  { title: "Platform Requirements Checklist", description: "Submission guidelines", format: "PDF" },
  { title: "Evidence Collection Guide", description: "Step-by-step process", format: "PDF" },
  { title: "ROI Calculator Spreadsheet", description: "Calculate your savings", format: "XLSX" },
];

export default function ResourcesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 gradient-radial">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Resources &{" "}
              <span className="gradient-text">Learning Center</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Tutorials, guides, and tools to help you protect your content effectively.
            </p>
            <div className="relative max-w-md mx-auto">
              <input 
                type="text" 
                placeholder="Search resources..." 
                className="w-full px-6 py-4 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {resourceCategories.map((category) => (
              <div 
                key={category.title}
                className="p-8 rounded-2xl glass-card border border-border"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                    <p className="text-muted-foreground text-sm">{category.description}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {category.items.map((item) => (
                    <li key={item.title}>
                      <a 
                        href="#" 
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary/50 transition-colors group"
                      >
                        <span className="group-hover:text-primary transition-colors">{item.title}</span>
                        <span className="text-sm text-muted-foreground">{item.time}</span>
                      </a>
                    </li>
                  ))}
                </ul>
                <Button variant="ghost" className="w-full mt-4">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-24 bg-card/50" id="success-stories">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Articles</h2>
            <p className="text-muted-foreground">
              In-depth guides and insights from our content protection experts.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredArticles.map((article) => (
              <div 
                key={article.title}
                className="p-6 rounded-2xl glass-card border border-border feature-card"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  {article.category}
                </span>
                <h3 className="text-lg font-bold mb-3 line-clamp-2">{article.title}</h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  <Button variant="ghost" size="sm">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloads */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Free Downloads</h2>
            <p className="text-muted-foreground">
              Templates, checklists, and tools to enhance your content protection.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {downloads.map((download) => (
              <div 
                key={download.title}
                className="p-6 rounded-xl glass-card border border-border text-center feature-card"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Download className="h-6 w-6 text-primary" />
                </div>
                <h4 className="font-semibold mb-1">{download.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{download.description}</p>
                <span className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium">
                  {download.format}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webinars */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Weekly Webinars</h2>
                <p className="text-muted-foreground mb-6">
                  Join our live sessions every Thursday to learn content protection strategies, 
                  get your questions answered, and connect with other creators.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Live Q&A with protection experts</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Platform updates and new features</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full" />
                    <span>Creator success story spotlights</span>
                  </li>
                </ul>
                <Button variant="hero">
                  Register for Next Webinar
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
              <div className="glass-card rounded-2xl p-2 border border-border">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center cursor-pointer hover:bg-primary/30 transition-colors">
                    <Play className="h-8 w-8 text-primary ml-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Protecting?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Put these resources into action with a free trial of CreatorShield.
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
