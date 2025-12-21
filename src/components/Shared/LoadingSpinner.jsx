const LoadingSpinner = ({ smallHeight }) => {
  return (
    <div
      className={`${smallHeight ? "h-[250px]" : "h-[70vh]"} flex flex-col justify-center items-center`}
    >
      <div className="relative w-20 h-20">
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-4 h-4 bg-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        
        <div className="absolute inset-0 animate-spin">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDelay: '0.2s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-500 rounded-full"></div>
        </div>
        <div className="absolute inset-0 animate-spin" style={{ animationDelay: '0.4s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-purple-600 rounded-full"></div>
        </div>
        
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-2 border-purple-300 rounded-full animate-ping"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;