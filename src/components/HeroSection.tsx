import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Grid background */}
      <div className="absolute inset-0 grid-dots opacity-50" />
      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center py-20">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-xs font-mono text-primary mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
            Context Recovery Engine
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight mb-6">
            You didn't lose your skill.{" "}
            <span className="text-gradient-terminal">You lost your context.</span>
          </h1>

          <p className="text-lg text-muted-foreground max-w-lg mb-8 leading-relaxed">
            DevResume AI instantly restores what you were building, what's missing, and exactly where to continue—so you can ship faster.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="hero" size="lg" className="gap-2">
              Analyze My Code <ArrowRight className="h-4 w-4" />
            </Button>
            <Button variant="hero-outline" size="lg" className="gap-2">
              <Play className="h-4 w-4" /> Watch 30s Demo
            </Button>
          </div>
        </motion.div>

        {/* Right: Code card */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative"
        >
          <div className="glow-border rounded-xl bg-card p-1">
            <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
              <div className="h-3 w-3 rounded-full bg-destructive/60" />
              <div className="h-3 w-3 rounded-full bg-yellow-500/60" />
              <div className="h-3 w-3 rounded-full bg-primary/60" />
              <span className="ml-2 text-xs text-muted-foreground font-mono">auth.py</span>
            </div>
            <div className="p-5 font-mono text-sm leading-relaxed">
              <div className="text-muted-foreground"># TODO: finish user auth</div>
              <div>
                <span className="text-blue-400">def</span>{" "}
                <span className="text-primary">login</span>
                <span className="text-foreground">(email, password):</span>
              </div>
              <div className="text-muted-foreground pl-4">
                pass  <span className="text-primary/60"># ← you stopped here</span>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute -bottom-6 -right-4 lg:-right-8 w-72"
          >
            <div className="glow-border rounded-xl bg-card/95 backdrop-blur-sm p-4 border border-primary/10">
              <div className="flex items-center gap-2 mb-3">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-mono text-primary">AI Analysis</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div><span className="text-muted-foreground">GOAL:</span> <span className="text-foreground">Build secure login</span></div>
                <div><span className="text-muted-foreground">NEXT:</span> <span className="text-foreground">Add bcrypt + JWT</span></div>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">MOMENTUM:</span>
                  <div className="flex-1 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full w-3/5 rounded-full bg-primary" />
                  </div>
                  <span className="text-primary">60%</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
