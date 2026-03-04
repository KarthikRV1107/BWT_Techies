import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Simple Button fallback (remove if you have your own component) */
const Button = ({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-md font-medium transition-all ${
      disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-105"
    } bg-[hsl(142_71%_45%)] text-black ${className}`}
  >
    {children}
  </button>
);

export default function Landing() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [code, setCode] = useState(`def login(email, password):
    # TODO: validate input
    # TODO: hash password
    # TODO: check user exists
    pass`);

  const [level, setLevel] = useState<"Beginner" | "Intermediate" | "Advanced">(
    "Intermediate"
  );
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!code.trim()) return;

    try {
      setLoading(true);
      setResult(null);

      // 🔥 Replace with real backend call
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, level }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (error) {
      setResult("Error analyzing code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[hsl(220_20%_4%)] text-white">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-[hsla(220,20%,4%,0.7)] border-b border-[hsl(220_14%_14%)]">
        <div className="max-w-[1100px] mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-semibold text-lg">DevResume AI</span>
          <button
            className="md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>
        </div>
      </header>

      <main className="max-w-[1100px] mx-auto px-4 pt-24">
        {/* Hero */}
        <section className="py-12 text-center">
          <h1 className="text-4xl font-extrabold mb-4">
            You didn't lose your skill.
            <br />
            <span className="text-[hsl(142_71%_45%)]">
              You lost your context.
            </span>
          </h1>
          <p className="text-gray-400 max-w-[600px] mx-auto">
            DevResume AI restores what you were building and tells you exactly
            where to continue.
          </p>
        </section>

        {/* Demo Section */}
        <section className="grid md:grid-cols-2 gap-8 pb-16">
          {/* Input */}
          <div className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(220_14%_14%)] p-4">
            <h3 className="font-bold mb-3">Paste Code</h3>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-48 font-mono text-sm bg-[hsl(220_20%_6%)] p-3 rounded-lg"
            />

            <div className="flex items-center gap-3 mt-3">
              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value as "Beginner" | "Intermediate" | "Advanced")
                }
                className="bg-[hsl(220_20%_4%)] border border-[hsl(220_14%_14%)] rounded px-3 py-2"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>

              <Button onClick={analyze} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
          </div>

          {/* Output */}
          <div className="rounded-lg bg-[hsl(220_18%_7%)] border border-[hsl(142_71%_45%_/_0.3)] p-4">
            <h3 className="font-bold mb-3">Analysis Results</h3>

            <pre className="font-mono text-sm whitespace-pre-wrap bg-[hsl(220_20%_6%)] p-3 rounded-lg min-h-[200px]">
              {result ?? "Click Analyze to generate your context report."}
            </pre>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-gray-500 border-t border-[hsl(220_14%_14%)]">
          © 2026 DevResume AI — No purple. No generic AI.
        </footer>
      </main>
    </div>
  );
}