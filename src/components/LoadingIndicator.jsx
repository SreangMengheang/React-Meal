import React from "react";

const LoadingIndicator = () => (
  <div className="flex justify-center items-center py-8">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
    <span className="ml-4 text-white text-lg">Loading...</span>
  </div>
);

export default LoadingIndicator;