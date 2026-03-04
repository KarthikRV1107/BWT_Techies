import { motion } from "framer-motion";
import { Brain, BarChart3, Target, AlertTriangle } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Context Recovery",
    desc: "Infers your original goal from any code snippet—no manual docs needed.",
  },
  {
    icon: BarChart3,
    title: "Momentum Score",
    desc: "Instant completion % plus effort estimate (Low / Medium / High).",
  },
  {
    icon: Target,
    title: "Next Steps",
    desc: "Three prioritized, actionable tasks to get you shipping again.",
  },
  {
    icon: AlertTriangle,
    title: "Risk Radar",
    desc: "Surfaces TODOs, missing tests, and weak error handling before they bite.",
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="relative py-24">
      <div className="absolute inset-0 grid-dots opacity-30" />
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="text-gradient-terminal">DevResume AI</span>?
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Four engines working together to eliminate context-switching overhead.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-all duration-300"
            >
              <div className="absolute inset-0 rounded-xl bg-primary/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary mb-4">
                  <f.icon className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
