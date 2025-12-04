const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-center">
          <div
            className={`${sizes[size]} border-4 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto`}
          />
          <p className="mt-4 text-gray-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-8">
      <div
        className={`${sizes[size]} border-4 border-primary-600 border-t-transparent rounded-full animate-spin`}
      />
    </div>
  );
};

export default Loader;
