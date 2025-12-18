import { useNavigate } from "react-router-dom";

const CategoryCard = ({ category }) => {

    const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/cars?category=${category.slug}`);
  };

  return (
    <div onClick={handleClick} className="category-card group relative h-[700px] w-[200px] cursor-pointer overflow-hidden rounded-2xl">

      {/* Background Image */}
      <img
        src={category.image}
        alt={category.title}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-500 group-hover:from-black/90" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6">
        <h3 className="text-2xl font-semibold text-white tracking-wide text-center">
          {category.title}
        </h3>
        <p className="mt-2 text-sm text-gray-300">
          {category.tagline}
        </p>

        <span className="mt-4 inline-block text-sm text-white/80 opacity-0 text-center transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2">
          Explore →
        </span>
      </div>
    </div>
  );
};

export default CategoryCard;
