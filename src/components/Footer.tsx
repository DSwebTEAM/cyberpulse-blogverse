
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full border-t border-white/10 mt-auto">
      <div className="container px-4 md:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary"></div>
              <span className="text-xl font-bold tracking-tight glow-text">CyberPulse</span>
            </Link>
            <p className="text-sm text-foreground/70">
              Your source for futuristic tech insights, news, and tutorials
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Navigation</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-sm text-foreground/70 hover:text-foreground">Home</Link>
              <Link to="/blog" className="text-sm text-foreground/70 hover:text-foreground">Blog</Link>
              <Link to="/categories" className="text-sm text-foreground/70 hover:text-foreground">Categories</Link>
              <Link to="/about" className="text-sm text-foreground/70 hover:text-foreground">About</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Categories</h3>
            <nav className="flex flex-col space-y-2">
              <Link to="/categories/system-updates" className="text-sm text-foreground/70 hover:text-foreground">System Updates</Link>
              <Link to="/categories/tech-facts" className="text-sm text-foreground/70 hover:text-foreground">Tech Facts</Link>
              <Link to="/categories/tutorials" className="text-sm text-foreground/70 hover:text-foreground">Tutorials</Link>
              <Link to="/categories/news" className="text-sm text-foreground/70 hover:text-foreground">News</Link>
            </nav>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-3">Connect</h3>
            <form className="space-y-2">
              <p className="text-sm text-foreground/70">Subscribe to our newsletter</p>
              <div className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-muted/50 text-foreground/90 px-3 py-2 rounded-md flex-1 text-sm border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyber-primary" 
                />
                <button 
                  type="submit" 
                  className="cyber-button !py-2 !text-sm !px-4"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-foreground/60">
            © {new Date().getFullYear()} CyberPulse BlogVerse. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link to="/privacy" className="text-xs text-foreground/60 hover:text-foreground">Privacy</Link>
            <Link to="/terms" className="text-xs text-foreground/60 hover:text-foreground">Terms</Link>
            <Link to="/contact" className="text-xs text-foreground/60 hover:text-foreground">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
