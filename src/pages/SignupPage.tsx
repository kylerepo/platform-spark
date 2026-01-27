import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Eye, EyeOff, ArrowRight, Check, Loader2 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

const plans = [
  { value: "starter", label: "Starter - $19/mo", description: "50 watermarks, 500 scans" },
  { value: "pro", label: "Pro - $49/mo", description: "300 watermarks, 3,000 scans" },
  { value: "enterprise", label: "Enterprise - $149/mo", description: "Unlimited watermarks" },
];

const platforms = [
  { value: "onlyfans", label: "OnlyFans" },
  { value: "fansly", label: "Fansly" },
  { value: "patreon", label: "Patreon" },
  { value: "manyvids", label: "ManyVids" },
  { value: "other", label: "Other" },
];

const benefits = [
  "14-day free trial, no credit card required",
  "Full access to all features during trial",
  "Cancel anytime with no obligations",
  "24/7 support from day one",
];

export default function SignupPage() {
  const navigate = useNavigate();
  const { signUp, user } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    platform: "",
    plan: "pro",
    agreeToTerms: false,
  });

  // Redirect if already logged in
  if (user) {
    navigate("/dashboard");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (!formData.agreeToTerms) {
      toast.error("Please agree to the terms and conditions");
      return;
    }

    setLoading(true);

    const { error } = await signUp(formData.email, formData.password, formData.name);

    if (error) {
      if (error.message.includes("already registered")) {
        toast.error("This email is already registered. Please sign in instead.");
      } else {
        toast.error(error.message || "Failed to create account");
      }
      setLoading(false);
      return;
    }

    toast.success("Account created! Welcome to CreatorShield.");
    navigate("/dashboard");
  };

  const passwordStrength = () => {
    const { password } = formData;
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak" };
    if (password.length < 10) return { strength: 2, label: "Fair" };
    if (/[A-Z]/.test(password) && /[0-9]/.test(password)) return { strength: 4, label: "Strong" };
    return { strength: 3, label: "Good" };
  };

  const { strength, label } = passwordStrength();

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Link to="/" className="flex items-center gap-2 mb-8">
            <Shield className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold">
              Creator<span className="gradient-text">Shield</span>
            </span>
          </Link>

          <h1 className="text-3xl font-bold mb-2">Start protecting your content</h1>
          <p className="text-muted-foreground mb-8">
            Create your account and start your 14-day free trial.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="name">Creator Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your display name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="h-12 bg-secondary border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="creator@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="h-12 bg-secondary border-border"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="8+ characters, 1 number"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="h-12 bg-secondary border-border pr-12"
                  required
                  minLength={8}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {formData.password && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex-1 h-1 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all ${
                        strength === 1 ? 'w-1/4 bg-destructive' :
                        strength === 2 ? 'w-2/4 bg-warning' :
                        strength === 3 ? 'w-3/4 bg-primary' :
                        strength === 4 ? 'w-full bg-success' : 'w-0'
                      }`}
                    />
                  </div>
                  <span className={`text-xs ${
                    strength === 1 ? 'text-destructive' :
                    strength === 2 ? 'text-warning' :
                    strength === 3 ? 'text-primary' :
                    strength === 4 ? 'text-success' : ''
                  }`}>
                    {label}
                  </span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Platform</Label>
                <Select 
                  value={formData.platform}
                  onValueChange={(value) => setFormData({ ...formData, platform: value })}
                >
                  <SelectTrigger className="h-12 bg-secondary border-border">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {platforms.map((platform) => (
                      <SelectItem key={platform.value} value={platform.value}>
                        {platform.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Plan</Label>
                <Select 
                  value={formData.plan}
                  onValueChange={(value) => setFormData({ ...formData, plan: value })}
                >
                  <SelectTrigger className="h-12 bg-secondary border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {plans.map((plan) => (
                      <SelectItem key={plan.value} value={plan.value}>
                        {plan.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => 
                  setFormData({ ...formData, agreeToTerms: checked as boolean })
                }
                className="mt-1"
              />
              <Label htmlFor="terms" className="text-sm text-muted-foreground font-normal">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">Terms of Service</Link>
                {" "}and{" "}
                <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>

            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="w-full"
              disabled={!formData.agreeToTerms || loading}
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  Start 14-Day Free Trial
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-medium">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right Side - Benefits */}
      <div className="hidden lg:flex flex-1 items-center justify-center p-8 gradient-radial border-l border-border">
        <div className="max-w-md">
          <h2 className="text-2xl font-bold mb-8">
            Start protecting your content in minutes
          </h2>
          <ul className="space-y-4">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-primary" />
                </div>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 p-6 rounded-xl glass-card border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/30 to-accent/30" />
              <div>
                <p className="font-medium">Sarah Chen</p>
                <p className="text-sm text-muted-foreground">OnlyFans Creator</p>
              </div>
            </div>
            <p className="text-muted-foreground italic">
              "I wish I had started using CreatorShield sooner. The peace of mind is worth every penny."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
