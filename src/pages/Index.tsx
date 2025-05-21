
import { Link } from "react-router-dom";
import { Search, Plus } from "lucide-react";
import NavbarWithReader from "@/components/NavbarWithReader";
import Footer from "@/components/Footer";
import FeaturedPost from "@/components/FeaturedPost";
import PostCard from "@/components/PostCard";
import CategoryCard from "@/components/CategoryCard";
import { featuredPosts, recentPosts, categories } from "@/data/mockData";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <NavbarWithReader />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-cyber-background">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-primary/20 via-transparent to-transparent opacity-60"></div>
          </div>
          <div className="container px-4 py-20 md:py-32 md:px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight glow-text">
                CyberPulse BlogVerse
              </h1>
              <p className="text-lg md:text-xl text-foreground/80">
                Your source for cutting-edge tech insights, tutorials, and news in a futuristic digital space
              </p>
              
              <div className="bg-white/5 backdrop-blur-md p-2 rounded-full max-w-lg mx-auto border border-white/10 flex items-center">
                <Search className="h-5 w-5 ml-3 text-foreground/70" />
                <input 
                  type="text" 
                  placeholder="Search for articles, topics, or tags..." 
                  className="bg-transparent flex-1 py-2 px-3 text-foreground focus:outline-none"
                />
                <button className="cyber-button px-5 py-2 rounded-full text-sm">
                  Search
                </button>
              </div>
              
              <div className="flex justify-center mt-4">
                <Link to="/reader" className="cyber-button px-6 py-3">
                  Try Our AI Reader
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-6 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
        </section>
        
        {/* Featured Posts */}
        <section className="py-16 container px-4 md:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Featured Articles</h2>
            <p className="text-foreground/70">Our top picks for you to explore</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.id} {...post} />
            ))}
          </div>
        </section>
        
        {/* Categories Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-2">Browse Categories</h2>
            <p className="text-foreground/70">Find content based on your interests</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.slug} {...category} />
            ))}
          </div>
        </section>
        
        {/* Recent Posts */}
        <section className="py-16 container px-4 md:px-6">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Articles</h2>
              <p className="text-foreground/70">Stay updated with the latest content</p>
            </div>
            <Link to="/blog" className="cyber-button">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.slice(0, 6).map((post) => (
              <PostCard key={post.id} {...post} />
            ))}
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 container px-4 md:px-6">
          <div className="cyber-card">
            <div className="relative z-10">
              <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyber-primary/20 via-transparent to-transparent opacity-60"></div>
              </div>
              <div className="py-12 px-6 md:py-16 md:px-12 text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Join Our Newsletter</h2>
                <p className="text-foreground/70 mb-6">
                  Stay up to date with the latest tech news, tutorials, and insights. No spam, just valuable content delivered to your inbox.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="bg-muted/50 text-foreground px-4 py-3 rounded-md flex-1 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyber-primary"
                  />
                  <button className="cyber-button sm:whitespace-nowrap">
                    Subscribe Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      {/* Floating Add Button */}
      <Link 
        to="/posteditor" 
        className="fixed bottom-8 right-8 size-16 bg-gradient-to-r from-cyber-primary to-cyber-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-cyber-primary/50 transition-all duration-300 z-50 animate-pulse-neon"
        aria-label="Create new post"
      >
        <Plus className="size-8 text-white" strokeWidth={2.5} />
      </Link>
    </div>
  );
};

export default Index;
