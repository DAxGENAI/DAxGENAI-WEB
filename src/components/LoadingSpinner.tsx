import React from 'react';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="relative">
        {/* Outer ring */}
        <div className="w-12 h-12 border-4 border-blue-200 rounded-full animate-spin">
          <div className="absolute top-0 left-0 w-12 h-12 border-4 border-transparent border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        
        {/* Inner dot */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
      </div>
      
      {/* Loading text */}
      <div className="ml-4">
        <div className="text-gray-600 font-medium">Loading...</div>
        <div className="text-sm text-gray-400">Please wait</div>
      </div>
    </div>
  );
};

export default LoadingSpinner; 