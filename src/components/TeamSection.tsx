import { motion } from "framer-motion";

const team = [
  { name: "Karthik R", role: "Full-stack & AI", initial: "K" },
  { name: "Shashank", role: "Backend & DevOps", initial: "S" },
  { name: "Aditya", role: "Frontend & UX", initial: "A" },
];

const TeamSection = () => {
  return (
    <section id="team" className="relative py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Built by <span className="text-gradient-terminal">BWT_Techies</span>
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {team.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="group flex flex-col items-center"
            >
              <div className="relative h-20 w-20 rounded-full border-2 border-primary/20 bg-secondary flex items-center justify-center text-2xl font-bold text-primary mb-4 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_hsl(142_71%_45%/0.15)] transition-all duration-300">
                {t.initial}
              </div>
              <h3 className="font-semibold text-foreground">{t.name}</h3>
              <p className="text-sm text-muted-foreground font-mono">{t.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
