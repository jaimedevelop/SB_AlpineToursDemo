import React, { useState, useRef, TouchEvent, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageCarouselProps {
  images: string[];
  altText?: string;
}

interface ImageInfo {
  src: string;
  width: number;
  height: number;
  isHighQuality: boolean;
  loaded: boolean;
  error: boolean;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, altText }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageInfos, setImageInfos] = useState<ImageInfo[]>([]);
  const touchStartX = useRef<number | null>(null);
  
  // Load and analyze all images on component mount
  useEffect(() => {
    const loadImages = async () => {
      const infos: ImageInfo[] = [];
      
      for (const imageSrc of images) {
        try {
          const img = new Image();
          const imageInfo = await new Promise<ImageInfo>((resolve, reject) => {
            img.onload = () => {
              const isHighQuality = img.naturalWidth >= 1000 || img.naturalHeight >= 1000;
              resolve({
                src: imageSrc,
                width: img.naturalWidth,
                height: img.naturalHeight,
                isHighQuality,
                loaded: true,
                error: false
              });
            };
            img.onerror = () => {
              resolve({
                src: imageSrc,
                width: 0,
                height: 0,
                isHighQuality: false,
                loaded: true,
                error: true
              });
            };
            img.src = imageSrc;
          });
          infos.push(imageInfo);
        } catch (error) {
          infos.push({
            src: imageSrc,
            width: 0,
            height: 0,
            isHighQuality: false,
            loaded: true,
            error: true
          });
        }
      }
      
      setImageInfos(infos);
    };
    
    loadImages();
  }, [images]);
  
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };
  
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };
  
  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartX.current === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    touchStartX.current = null;
  };
  
  const currentImageInfo = imageInfos[currentImageIndex];
  const currentImageSrc = images[currentImageIndex];
  
  // Show loading state while analyzing images
  if (imageInfos.length === 0) {
    return (
      <div className="relative mb-6">
        <div className="w-full h-64 rounded-xl bg-gray-200 animate-pulse flex items-center justify-center">
          <div className="text-gray-400 text-sm">Loading images...</div>
        </div>
      </div>
    );
  }
  
  // Error fallback
  if (currentImageInfo?.error) {
    return (
      <div className="relative mb-6">
        <div className="w-full h-64 rounded-xl bg-gray-200 flex items-center justify-center">
          <div className="text-gray-400 text-sm">Image not available</div>
        </div>
      </div>
    );
  }
  
  const renderImage = () => {
    if (!currentImageInfo) return null;
    
    // High quality image - use standard approach
    if (currentImageInfo.isHighQuality) {
      return (
        <img 
          src={currentImageSrc} 
          alt={altText ? `${altText} - Image ${currentImageIndex + 1}` : `Image ${currentImageIndex + 1}`} 
          className="w-full h-full object-cover transition-opacity duration-300"
          draggable="false"
        />
      );
    }
    
    // Low quality image - use enhanced mode with blurred background
    return (
      <div className="relative w-full h-full">
        {/* Blurred background */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-md scale-110"
          style={{ 
            backgroundImage: `url(${currentImageSrc})`,
            filter: 'blur(8px) brightness(0.7)'
          }}
        />
        
        {/* Sharp overlay image */}
        <div className="relative w-full h-full flex items-center justify-center p-2">
          <img 
            src={currentImageSrc} 
            alt={altText ? `${altText} - Image ${currentImageIndex + 1}` : `Image ${currentImageIndex + 1}`} 
            className="max-w-full max-h-full object-contain drop-shadow-lg"
            draggable="false"
          />
        </div>
      </div>
    );
  };
  
  return (
    <div className="relative mb-6">
      <div 
        className="w-full h-64 overflow-hidden rounded-xl relative bg-gray-100"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {renderImage()}
        
        {images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white/95 transition-colors shadow-lg z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 rounded-full p-2 hover:bg-white/95 transition-colors shadow-lg z-10"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
            
            <div className="absolute bottom-3 left-0 right-0 flex justify-center z-10">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full mx-1 transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
        

      </div>
    </div>
  );
};

export default ImageCarousel;