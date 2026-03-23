import React, { useState } from "react";
import { motion } from "framer-motion";

/**
 * OptimizedImage Component
 * Features:
 * - Lazy loading with blur-up effect
 * - Responsive images
 * - Loading skeleton placeholder
 * - Proper width/height attributes to prevent CLS
 * - Smooth fade-in animation
 */
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  onLoad,
  blurredSrc = null,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setError(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Blur placeholder */}
      {blurredSrc && !isLoaded && (
        <img
          src={blurredSrc}
          alt={alt}
          className={`${className} absolute inset-0 scale-110 blur-lg`}
          aria-hidden="true"
        />
      )}

      {/* Loading skeleton */}
      {!isLoaded && !error && (
        <div
          className={`${className} absolute inset-0 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 animate-pulse`}
          style={{
            width: width ? `${width}px` : "100%",
            height: height ? `${height}px` : "auto",
          }}
        />
      )}

      {/* Main image */}
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoaded ? "opacity-100" : "opacity-0"} transition-opacity duration-500`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
      />

      {/* Error fallback */}
      {error && (
        <div
          className={`${className} bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm text-slate-500 dark:text-slate-400`}
        >
          <span>Image unavailable</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
