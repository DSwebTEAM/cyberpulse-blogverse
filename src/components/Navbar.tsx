
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, X, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-background/80 border-b border-white/10">
      <div className="container flex items-center justify-between h-16 px-4 md:px-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="size-8 rounded-full bg-gradient-to-br from-cyber-primary to-cyber-secondary animate-pulse-neon"></div>
          <span className="text-xl font-bold tracking-tight glow-text">CyberPulse</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/blog" className="nav-link">Blog</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/settings" className="nav-link">Settings</Link>
          <Link to="/about" className="nav-link">About</Link>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Search className="h-5 w-5" />
          </Button>
          <Button className="cyber-button">
            Sign In
          </Button>
        </div>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden rounded-full"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden glass-panel">
          <nav className="flex flex-col p-4 space-y-4">
            <Link to="/blog" className="nav-link">Blog</Link>
            <Link to="/categories" className="nav-link">Categories</Link>
            <Link to="/settings" className="nav-link">Settings</Link>
            <Link to="/about" className="nav-link">About</Link>
            <Button className="cyber-button w-full">
              Sign In
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
