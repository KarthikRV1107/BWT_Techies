import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Lightbulb, Globe, Rocket } from "lucide-react";

const pitchItems = [
  {
    icon: Zap,
    title: "Problem",
    desc: "Developers lose 20–40 min every time they return to unfinished code—context switching kills flow.",
  },
  {
    icon: Lightbulb,
    title: "Solution",
    desc: "DevResume AI restores context instantly: goal, gaps, next steps, and a momentum score.",
  },
  {
    icon: Globe,
    title: "Market",
    desc: "26 M devs worldwide; every IDE, PR, and code review can embed our engine.",
  },
  {
    icon: Rocket,
    title: "Momentum",
    desc: "Working prototype in 5 h; GitHub trending; judges' favorite metric: completion %.",
  },
];

const PitchSection = () => {
  return (
    <section id="pitch" className="relative py-24">
      <div className="absolute inset-0 grid-dots opacity-20" />
      <div className="container relative z-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Hackathon Pitch</h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-12">
          {pitchItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Button variant="hero" size="lg" className="gap-2" asChild>
            <a href="#demo">
              Try Live Demo <ArrowRight className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PitchSection;
