import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Brain, BarChart3, Target, AlertTriangle, Menu } from 'lucide-react'
import { Button } from '../components/ui/button'

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [code, setCode] = useState(`def login(email, password):
    # TODO: validate input
    # TODO: hash password
    # TODO: check user exists
    pass`)
  const [result, setResult] = useState<string | null>(null)

  const analyze = () => {
    setResult(`GOAL:
Build secure authentication

CURRENT STATE:
Functions: 1, TODOs: 3, pass statements indicate unfinished flow

EXPLANATION:
Intermediate: The function scaffolds login but lacks hashing, validation, and user retrieval.

NEXT STEPS:
- Add input validation and error handling
- Integrate hashing and user lookup
- Return JWT token and session controls

MOMENTUM SCORE:
Completion: 35%
Effort to Continue: Medium

RISKS / IMPROVEMENTS:
- Missing error handling and tests
- Security gaps (hashing, tokens)`)
  }

  return (
    <div className="min-h-screen bg-background text-foreground grid-dots">
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-[hsla(220,20%,4%,0.7)] border-b border-[hsl(220_14%_14%)]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Terminal className="text-[hsl(142_71%_45%)]" />
            <span className="font-semibold">DevResume AI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="hover:text-[hsl(142_71%_45%)]">Features</a>
            <a href="#demo" className="hover:text-[hsl(142_71%_45%)]">Demo</a>
            <a href="#team" className="hover:text-[hsl(142_71%_45%)]">Team</a>
            <a href="#pitch" className="hover:text-[hsl(142_71%_45%)]">Pitch</a>
            <Button variant="hero" className="shadow-glow">Try Now</Button>
          </nav>
          <button className="md:hidden" onClick={() => setMobileOpen(v => !v)}>
            <Menu />
          </button>
        </div>
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden px-4 pb-3"
            >
              <div className="flex flex-col gap-2">
                <a href="#features" className="py-2 border-b border-[hsl(220_14%_14%)]">Features</a>
                <a href="#demo" className="py-2 border-b border-[hsl(220_14%_14%)]">Demo</a>
                <a href="#team" className="py-2 border-b border-[hsl(220_14%_14%)]">Team</a>
                <a href="#pitch" className="py-2">Pitch</a>
                <Button variant="hero" className="mt-2 w-full">Try Now</Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 pt-24">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 text-sm text-[hsl(142_71%_45%)] mb-4">
              <span className="w-2 h-2 rounded-full bg-[hsl(142_71%_45%)] animate-pulse-glow" />
              Context Recovery Engine
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              You didn't lose your skill.
              <br />
              <span className="text-gradient-terminal">You lost your context.</span>
            </h1>
            <p className="text-[hsl(220_10%_50%)] mb-6 max-w-[52ch]">
              DevResume AI restores what you were building, what's missing, and exactly where to continue — so you ship faster.
            </p>
            <div className="flex gap-3">
              <Button variant="hero" size="lg">Get Started</Button>
              <Button variant="hero-outline" size="lg">Watch Demo</Button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(220_14%_14%)] p-4 shadow-card relative overflow-hidden">
              <div className="scanline absolute inset-0 pointer-events-none" />
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-[hsl(142_71%_45%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(220_14%_14%)]" />
                <div className="w-3 h-3 rounded-full bg-[hsl(220_14%_14%)]" />
                <span className="ml-2 text-sm text-[hsl(220_10%_50%)]">auth.py</span>
              </div>
              <pre className="font-[JetBrains_Mono] text-sm bg-[hsl(220_20%_6%)] p-3 rounded-lg">
{code}
              </pre>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-4 rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(142_71%_45%_/_0.3)] p-4 shadow-glow"
            >
              <div className="text-sm text-[hsl(142_71%_45%)] font-semibold mb-2">AI Analysis</div>
              <div className="text-sm">
                <div className="mb-1"><span className="font-semibold">GOAL:</span> Build secure login</div>
                <div className="mb-1"><span className="font-semibold">NEXT:</span> Hash + JWT + validation</div>
                <div className="mb-2"><span className="font-semibold">MOMENTUM:</span> 35%</div>
                <div className="w-full h-2 bg-[hsl(220_14%_14%)] rounded">
                  <div className="h-2 rounded bg-[hsl(142_71%_45%)]" style={{ width: '35%' }} />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section id="features" className="py-16">
          <motion.h2 className="text-3xl font-extrabold text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Why <span className="text-gradient-terminal">DevResume AI?</span>
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, title: 'Context Recovery', desc: 'Infers your original goal from any code snippet.' },
              { icon: BarChart3, title: 'Momentum Score', desc: 'Completion % plus effort estimate (Low/Medium/High).' },
              { icon: Target, title: 'Next Steps', desc: 'Three prioritized, actionable tasks to resume fast.' },
              { icon: AlertTriangle, title: 'Risk Radar', desc: 'Find TODOs, missing tests, and weak error handling.' },
            ].map((f, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(220_14%_14%)] p-4 hover:shadow-glow transition-shadow">
                <div className="w-10 h-10 rounded bg-[hsl(142_71%_45%_/_0.15)] grid place-items-center mb-3">
                  <f.icon className="text-[hsl(142_71%_45%)]" />
                </div>
                <div className="font-semibold mb-2">{f.title}</div>
                <div className="text-[hsl(220_10%_50%)] text-sm">{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="demo" className="py-16 grid md:grid-cols-2 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(220_14%_14%)] p-4">
            <h3 className="font-bold mb-3">Paste Code</h3>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 font-[JetBrains_Mono] text-sm bg-[hsl(220_20%_6%)] p-3 rounded-lg"
            />
            <div className="flex items-center gap-3 mt-3">
              <select className="bg-[hsl(220_20%_4%)] border border-[hsl(220_14%_14%)] rounded px-3 py-2">
                <option>Beginner</option>
                <option selected>Intermediate</option>
                <option>Advanced</option>
              </select>
              <Button variant="hero" onClick={analyze}>Analyze</Button>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(142_71%_45%_/_0.3)] p-4 shadow-glow">
            <h3 className="font-bold mb-3">Analysis Results</h3>
            <pre className="font-[JetBrains_Mono] text-sm whitespace-pre-wrap bg-[hsl(220_20%_6%)] p-3 rounded-lg min-h-48">
              {result ?? 'Click Analyze to generate your context report.'}
            </pre>
          </motion.div>
        </section>

        <section id="team" className="py-16">
          <motion.h2 className="text-3xl font-extrabold text-center mb-8 text-gradient-terminal" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Built by BWT_Techies
          </motion.h2>
          <div className="flex justify-center gap-8">
            {[
              { i: 'K', name: 'Karthik R', role: 'Full-stack & AI' },
              { i: 'S', name: 'Shashank', role: 'Backend & DevOps' },
              { i: 'A', name: 'Aditya', role: 'Frontend & UX' },
            ].map((t, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-center">
                <div className="w-16 h-16 rounded-full bg-[hsl(142_71%_45%_/_0.2)] border border-[hsl(142_71%_45%)] shadow-glow grid place-items-center text-xl font-bold mb-2">
                  {t.i}
                </div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-[hsl(220_10%_50%)] text-sm">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="pitch" className="py-16">
          <motion.h2 className="text-3xl font-extrabold text-center mb-10" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            Hackathon Pitch
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: 'Problem', desc: 'Context switch costs devs 20–40 min each return to unfinished code.' },
              { title: 'Solution', desc: 'DevResume AI restores context with goal, gaps, next steps, momentum.' },
              { title: 'Market', desc: '26M devs; IDEs, PRs, and reviews can embed our engine.' },
              { title: 'Momentum', desc: 'Working prototype; completion % is judges’ favorite metric.' },
            ].map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(220_14%_14%)] p-4">
                <div className="text-[hsl(142_71%_45%)] font-semibold mb-2">{c.title}</div>
                <div className="text-[hsl(220_10%_50%)]">{c.desc}</div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button variant="hero" size="lg">Try Live Demo</Button>
          </div>
        </section>

        <footer className="py-10 text-center text-[hsl(220_10%_50%)] border-t border-[hsl(220_14%_14%)]">
          © 2026 DevResume AI — Monochrome green on near-black. No purple, no generic AI.
        </footer>
      </main>
    </div>
  )
}
