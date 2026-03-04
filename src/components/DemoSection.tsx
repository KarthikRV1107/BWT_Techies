import { useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Sparkles, Copy, Download } from "lucide-react";

const sampleCode = `# TODO: finish user auth
def login(email, password):
    pass  # ← you stopped here

def register(email, password):
    # validate inputs
    pass`;

const sampleReport = `## 🎯 Recovery Report

**GOAL:** Build a secure authentication system with login and registration endpoints.

**COMPLETION:** 35%  ·  Effort: Low–Medium

### Next Steps
1. Implement password hashing with \`bcrypt\`
2. Add JWT token generation on successful login
3. Create input validation middleware

### ⚠️ Risks
- No error handling for invalid credentials
- Missing rate limiting on login endpoint
- No password strength validation`;

const DemoSection = () => {
  const [code, setCode] = useState(sampleCode);
  const [analyzed, setAnalyzed] = useState(false);
  const [level, setLevel] = useState("Beginner");

  return (
    <section id="demo" className="relative py-24">
      <div className="container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Live Demo</h2>
          <p className="text-muted-foreground">Paste code or use the sample below.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Drop your code</span>
              <div className="flex gap-1">
                {["Beginner", "Intermediate", "Advanced"].map((l) => (
                  <button
                    key={l}
                    onClick={() => setLevel(l)}
                    className={`px-3 py-1 rounded-md text-xs font-mono transition-colors ${
                      level === l
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
            <textarea
              value={code}
              onChange={(e) => { setCode(e.target.value); setAnalyzed(false); }}
              className="w-full h-56 p-4 bg-transparent font-mono text-sm text-foreground resize-none focus:outline-none"
              placeholder="Paste your code here..."
            />
            <div className="px-4 py-3 border-t border-border">
              <Button
                variant="hero"
                size="sm"
                className="gap-2"
                onClick={() => setAnalyzed(true)}
              >
                <Sparkles className="h-4 w-4" /> Analyze
              </Button>
            </div>
          </motion.div>

          {/* Output */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl border border-border bg-card overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-mono text-muted-foreground">Recovery Report</span>
              {analyzed && (
                <div className="flex gap-2">
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Copy className="h-4 w-4" />
                  </button>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            <div className="p-4 h-56 overflow-y-auto font-mono text-sm">
              {analyzed ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-3"
                >
                  <div>
                    <span className="text-primary font-semibold">🎯 GOAL:</span>{" "}
                    <span className="text-foreground">Build secure auth system</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold">COMPLETION:</span>
                    <div className="flex-1 max-w-32 h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "35%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-primary"
                      />
                    </div>
                    <span className="text-primary">35%</span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="text-primary font-semibold mb-2">NEXT STEPS:</div>
                    <div className="space-y-1 text-foreground">
                      <div>1. Add bcrypt password hashing</div>
                      <div>2. Implement JWT token generation</div>
                      <div>3. Create input validation</div>
                    </div>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="text-yellow-400 font-semibold mb-2">⚠️ RISKS:</div>
                    <div className="space-y-1 text-muted-foreground">
                      <div>• No error handling</div>
                      <div>• Missing rate limiting</div>
                      <div>• No password validation</div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  Click "Analyze" to generate your context report.
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;
