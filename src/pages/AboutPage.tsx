import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Target, 
  Heart,
  Users,
  Award,
  Globe,
  ArrowRight,
  Mail,
  Linkedin,
  Twitter
} from "lucide-react";

const values = [
  {
    icon: Shield,
    title: "Creator-First",
    description: "Everything we build starts with understanding creator needs. Your protection is our mission.",
  },
  {
    icon: Target,
    title: "Relentless Innovation",
    description: "We continuously advance our AI and detection technology to stay ahead of content thieves.",
  },
  {
    icon: Heart,
    title: "Trust & Transparency",
    description: "Your content is sacred. We operate with complete transparency and the highest security standards.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "We listen to our creator community and build features that matter most to you.",
  },
];

const stats = [
  { value: "2021", label: "Founded" },
  { value: "50K+", label: "Creators Protected" },
  { value: "45", label: "Team Members" },
  { value: "12", label: "Countries" },
];

const team = [
  {
    name: "Alexandra Chen",
    role: "CEO & Co-Founder",
    bio: "Former VP of Trust & Safety at a major social platform. 15+ years fighting content abuse.",
  },
  {
    name: "Marcus Williams",
    role: "CTO & Co-Founder",
    bio: "AI/ML researcher with expertise in computer vision and forensic watermarking technology.",
  },
  {
    name: "Sarah Mitchell",
    role: "Head of Creator Success",
    bio: "Former content creator who understands the challenges firsthand. Passionate about creator advocacy.",
  },
  {
    name: "David Park",
    role: "VP of Engineering",
    bio: "Previously built scalable infrastructure at major tech companies. Expert in real-time systems.",
  },
];

const press = [
  { outlet: "TechCrunch", quote: "CreatorShield is revolutionizing how creators protect their digital assets." },
  { outlet: "Forbes", quote: "The gold standard in content protection for the creator economy." },
  { outlet: "Wired", quote: "AI-powered protection that's finally giving creators the upper hand." },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 gradient-radial">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-8">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Protecting Creators.{" "}
              <span className="gradient-text">Defending Creativity.</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              We believe every creator deserves to control their work and earn from their creativity. 
              That's why we built the most advanced content protection platform in the world.
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Content theft costs creators billions of dollars every year. Leaked photos, pirated 
                videos, and stolen exclusive content rob creators of their hard-earned income and 
                can destroy careers overnight.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We started CreatorShield because we saw this problem firsthand. Our founders worked 
                in content moderation and creator advocacy, watching talented people struggle against 
                piracy with inadequate tools.
              </p>
              <p className="text-lg text-foreground font-medium">
                We're here to change that. With cutting-edge AI, forensic watermarking, and streamlined 
                legal enforcement, we give creators the power to protect their work and their livelihood.
              </p>
            </div>
            <div className="glass-card rounded-2xl p-8 border border-border">
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center p-4">
                    <div className="text-3xl font-bold gradient-text mb-2">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground">
              The principles that guide everything we do at CreatorShield.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div 
                key={value.title}
                className="p-6 rounded-xl glass-card border border-border text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-24" id="careers">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">Leadership Team</h2>
            <p className="text-muted-foreground">
              Experienced leaders committed to protecting creator communities.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {team.map((member) => (
              <div 
                key={member.name}
                className="p-6 rounded-xl glass-card border border-border text-center"
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto mb-4" />
                <h4 className="font-bold mb-1">{member.name}</h4>
                <p className="text-sm text-primary mb-3">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Want to join our team?</p>
            <Button variant="outline">
              View Open Positions
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Press */}
      <section className="py-24 bg-card/50" id="press">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4">In the Press</h2>
            <p className="text-muted-foreground">
              What industry leaders are saying about CreatorShield.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {press.map((item) => (
              <div 
                key={item.outlet}
                className="p-6 rounded-xl glass-card border border-border"
              >
                <Award className="h-8 w-8 text-primary mb-4" />
                <p className="text-foreground mb-4">"{item.quote}"</p>
                <p className="text-sm font-bold text-muted-foreground">— {item.outlet}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-24" id="contact">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about CreatorShield? We'd love to hear from you.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">hello@creatorshield.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Headquarters</p>
                      <p className="text-muted-foreground">San Francisco, CA</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                    <Twitter className="h-5 w-5" />
                  </a>
                  <a href="#" className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/10 transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-border">
                <h3 className="font-bold mb-6">Send us a message</h3>
                <form className="space-y-4">
                  <div>
                    <input 
                      type="text" 
                      placeholder="Your name" 
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Your message" 
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                    />
                  </div>
                  <Button variant="hero" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
