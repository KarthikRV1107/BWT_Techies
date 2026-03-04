import { Terminal } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-8">
      <div className="container flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
          <Terminal className="h-4 w-4 text-primary" />
          © 2026 BWT_Techies — Built for hackathons.
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          Context is everything.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
