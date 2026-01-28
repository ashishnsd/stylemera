// Reusable professional heading components

export const GradientHeading = ({ children, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-[0.15em] flex items-center gap-3">
      <span className="inline-block w-2 sm:w-2.5 h-8 sm:h-10 bg-gradient-to-b from-[#f0c14b] via-[#f0c14b]/80 to-transparent rounded-full shadow-lg shadow-[#f0c14b]/30" aria-hidden="true"></span>
      <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent relative">
        {children}
        <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#f0c14b] to-transparent opacity-50"></span>
      </span>
      <span className="flex-1 h-0.5 bg-gradient-to-r from-[#f0c14b]/30 to-transparent"></span>
    </h2>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-2 ml-8 font-medium tracking-wide">{subtitle}</p>
    )}
  </div>
);

export const HeroHeading = ({ children, subtitle, className = "" }) => (
  <div className={`text-center ${className}`}>
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 uppercase tracking-tight mb-4">
      <span className="bg-gradient-to-r from-gray-900 via-[#f0c14b] to-gray-900 bg-clip-text text-transparent drop-shadow-2xl">
        {children}
      </span>
    </h1>
    {subtitle && (
      <p className="text-lg sm:text-xl text-gray-600 font-medium max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);

export const HighlightHeading = ({ children, highlight, subtitle }) => (
  <div className="mb-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 flex items-center gap-2">
      {highlight && (
        <span className="px-3 py-1 bg-gradient-to-r from-[#f0c14b] to-yellow-400 text-gray-900 text-sm font-black uppercase rounded-full shadow-md">
          {highlight}
        </span>
      )}
      <span>{children}</span>
    </h2>
    {subtitle && (
      <p className="text-sm text-gray-500 mt-2 font-medium">{subtitle}</p>
    )}
  </div>
);

export const FancyHeading = ({ children, icon, subtitle }) => (
  <div className="mb-8 text-center">
    <div className="flex items-center justify-center gap-3 mb-3">
      {icon && (
        <span className="text-4xl text-[#f0c14b] animate-pulse">{icon}</span>
      )}
      <h2 className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 bg-clip-text text-transparent uppercase tracking-wide">
        {children}
      </h2>
      {icon && (
        <span className="text-4xl text-[#f0c14b] animate-pulse">{icon}</span>
      )}
    </div>
    {subtitle && (
      <p className="text-sm text-gray-500 font-medium italic">{subtitle}</p>
    )}
  </div>
);

export const UIHeading = ({ children, size = "md", className = "" }) => {
  const sizes = {
    sm: "text-lg sm:text-xl",
    md: "text-xl sm:text-2xl",
    lg: "text-2xl sm:text-3xl",
    xl: "text-3xl sm:text-4xl"
  };

  return (
    <h2 className={`${sizes[size]} font-bold text-gray-900 uppercase tracking-wide flex items-center gap-2 ${className}`}>
      <span className="inline-block w-1 h-5 bg-[#f0c14b] rounded" aria-hidden="true"></span>
      {children}
    </h2>
  );
};
