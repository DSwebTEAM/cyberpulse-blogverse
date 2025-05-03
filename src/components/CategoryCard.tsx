
import { Link } from "react-router-dom";

interface CategoryCardProps {
  name: string;
  description: string;
  icon: string;
  count: number;
  slug: string;
}

const CategoryCard = ({ name, description, icon, count, slug }: CategoryCardProps) => {
  return (
    <Link to={`/categories/${slug}`} className="group">
      <div className="cyber-card h-full group-hover:animate-pulse-neon transition-all duration-300">
        <div className="flex flex-col items-center text-center p-6">
          <img src={icon} alt={name} className="w-16 h-16 mb-4" />
          <h3 className="text-xl font-bold mb-2 group-hover:text-cyber-primary transition-colors">{name}</h3>
          <p className="text-sm text-foreground/70 mb-4">{description}</p>
          <div className="px-3 py-1 bg-muted rounded-full text-xs">
            {count} articles
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CategoryCard;
