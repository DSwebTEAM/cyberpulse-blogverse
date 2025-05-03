
import { useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-20 flex items-center justify-center">
        <div className="cyber-card max-w-lg w-full text-center py-16 px-6 relative overflow-hidden">
          <div className="space-y-6">
            <div className="relative z-10">
              <h1 className="text-8xl font-bold glow-text mb-4">404</h1>
              <h2 className="text-2xl font-medium mb-4">Page Not Found</h2>
              <p className="text-foreground/70 mb-8">
                The page you are looking for doesn't exist or has been moved.
              </p>
              <Link to="/" className="cyber-button inline-block">
                Return to Home
              </Link>
            </div>
          </div>
          
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-cyber-primary/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyber-secondary/30 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
