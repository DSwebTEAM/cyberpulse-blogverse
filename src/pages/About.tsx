
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-cyber-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-primary/20 via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="container px-4 py-20 md:py-32 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight glow-text">
                About CyberPulse
              </h1>
              <p className="text-lg md:text-xl text-foreground/80">
                Your premier destination for cutting-edge tech insights, tutorials, and news
              </p>
            </div>
          </div>
          <div className="absolute -bottom-6 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* About Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="cyber-card">
              <CardContent className="p-6 md:p-10 space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Our Mission</h2>
                  <p className="text-lg text-foreground/90">
                    CyberPulse BlogVerse aims to demystify technology and make it accessible to everyone. 
                    We provide in-depth analysis, step-by-step tutorials, and breaking news to keep you 
                    informed and empowered in the rapidly evolving tech landscape.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">What We Cover</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold glow-text">System Updates</h3>
                      <p className="text-foreground/80">
                        Stay current with the latest operating system releases, security patches, and feature updates.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold glow-text">Tech Facts</h3>
                      <p className="text-foreground/80">
                        Discover fascinating insights about technology history, hidden features, and interesting trivia.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold glow-text">Tutorials</h3>
                      <p className="text-foreground/80">
                        Learn with our easy-to-follow guides covering everything from basic software usage to advanced customizations.
                      </p>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-semibold glow-text">News</h3>
                      <p className="text-foreground/80">
                        Get breaking updates on product launches, industry developments, and technological breakthroughs.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Our Team</h2>
                  <p className="text-lg text-foreground/90">
                    CyberPulse is powered by a dedicated team of technology enthusiasts, writers, and developers 
                    who are passionate about sharing their knowledge and expertise with our community.
                  </p>
                </div>
                
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Join Our Community</h2>
                  <p className="text-lg text-foreground/90">
                    We invite you to become part of our growing community. Share your thoughts in the comments,
                    subscribe to our newsletter, or connect with us on social media to stay updated with
                    the latest in technology.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
