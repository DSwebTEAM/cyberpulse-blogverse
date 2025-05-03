
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  id: string;
  title: string;
  excerpt: string;
  cover: string;
  category: string;
  date: string;
  author: {
    name: string;
    avatar: string;
  };
}

const FeaturedPost = ({ id, title, excerpt, cover, category, date, author }: FeaturedPostProps) => {
  return (
    <div className="cyber-card group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/20 to-cyber-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-6 overflow-hidden rounded-lg">
          <img 
            src={cover} 
            alt={title} 
            className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-cyber-primary/90 text-foreground text-xs font-medium rounded-full">
              {category}
            </span>
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-2 line-clamp-2 group-hover:text-cyber-primary transition-colors">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>
        
        <p className="text-foreground/70 mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-8 h-8 rounded-full object-cover border border-white/20"
            />
            <span className="text-sm text-foreground/80">{author.name}</span>
          </div>
          <span className="text-xs text-foreground/60">{date}</span>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPost;
