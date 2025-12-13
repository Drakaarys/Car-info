const FeaturedCard = ({ car }) => {
  return (
    <div className="group relative min-w-[1000px] h-[250px] rounded-3xl bg-white/5 backdrop-blur-md overflow-hidden transition-transform duration-500 hover:-translate-y-4">

      {/* Video */}
      <video
        src={car.video}
        alt={car.video}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover scale-100 transition-transform duration-700 group-hover:scale-110"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-start p-6">
        <h3 className="text-2xl font-semibold text-white">
          {car.name}
        </h3>
        <p className="mt-2 text-sm text-gray-300">
          {car.tagline}
        </p>

        <span className="mt-4 inline-block text-sm text-white/80">
          View Car →
        </span>
      </div>
    </div>
  );
};

export default FeaturedCard;
