const Loader = () => {
  return (
    <div className="fixed inset-0 bg-black flex items-center justify-center z-9999">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin" />

        <p className="text-sm uppercase tracking-[0.2em] text-gray-300">
          Loading
        </p>
      </div>
    </div>
  );
};

export default Loader;
