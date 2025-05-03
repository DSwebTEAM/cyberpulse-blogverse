
import { Link } from "react-router-dom";

interface PostCardProps {
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

const PostCard = ({ id, title, excerpt, cover, category, date, author }: PostCardProps) => {
  return (
    <div className="cyber-card group overflow-hidden flex flex-col h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/10 to-cyber-secondary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="relative z-10 h-full flex flex-col">
        <div className="mb-4 overflow-hidden rounded-lg">
          <img 
            src={cover} 
            alt={title} 
            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <div className="mb-2 flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-cyber-primary/90 text-foreground text-xs font-medium rounded-full">
            {category}
          </span>
          <span className="text-xs text-foreground/60">{date}</span>
        </div>
        
        <h3 className="text-lg font-bold mb-2 line-clamp-2 group-hover:text-cyber-primary transition-colors">
          <Link to={`/blog/${id}`}>{title}</Link>
        </h3>
        
        <p className="text-foreground/70 text-sm mb-4 line-clamp-3">{excerpt}</p>
        
        <div className="mt-auto flex items-center">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-6 h-6 rounded-full object-cover border border-white/20"
          />
          <span className="ml-2 text-xs text-foreground/80">{author.name}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
