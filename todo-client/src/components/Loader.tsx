
const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white/80 backdrop-blur">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin" />
      </div>
      <p className="mt-4 text-gray-600 font-semibold text-lg animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;
