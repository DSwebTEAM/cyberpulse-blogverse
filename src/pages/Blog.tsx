
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PostCard from "@/components/PostCard";
import { featuredPosts, recentPosts } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";

const Blog = () => {
  const allPosts = [...featuredPosts, ...recentPosts];
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const filteredPosts = allPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory ? post.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const categories = Array.from(new Set(allPosts.map(post => post.category)));
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-1 container px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4">Blog</h1>
            <p className="text-foreground/70">Explore our collection of articles, tutorials, and tech insights</p>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-10 space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/60" />
                <input 
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles..." 
                  className="w-full bg-muted/50 border border-white/10 rounded-md py-2 pl-10 pr-4 text-foreground focus:outline-none focus:ring-2 focus:ring-cyber-primary"
                />
              </div>
              <Button className="flex items-center gap-2 bg-muted hover:bg-muted/80">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
              </Button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                className={selectedCategory === null ? "bg-cyber-primary hover:bg-cyber-primary/90" : ""}
              >
                All
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-cyber-primary hover:bg-cyber-primary/90" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map(post => (
                <PostCard key={post.id} {...post} />
              ))}
            </div>
          ) : (
            <div className="cyber-card text-center py-12">
              <h3 className="text-xl font-medium mb-2">No posts found</h3>
              <p className="text-foreground/70">Try adjusting your search or filter criteria</p>
            </div>
          )}
          
          {/* Pagination */}
          <div className="mt-12 flex justify-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="bg-cyber-primary hover:bg-cyber-primary/90">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
