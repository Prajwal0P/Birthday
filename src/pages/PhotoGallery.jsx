import React, { useState, useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { images } from "../photos.js";

const PhotoGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadedImages, setLoadedImages] = useState({});
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  
  const galleryRef = useRef(null);
  const lightboxRef = useRef(null);
  const imageRefs = useRef([]);
  const containerRef = useRef(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  // Simple memory titles
  const memoryTitles = [
    "Side by Side", "Partners in Crime", "Life’s Little Joys", "Heart & Soul",
    "Laugh Lines", "Our Adventures", "Together", "Bond Beyond Words",
    "Moments Like These", "Forever Us", "Joy in Motion", "Two Peas",
    "Shared Smiles", "Growing Strong", "Unstoppable Duo", "Cherished Times",
    "Soulmates", "The Dynamic Duo", "Golden Days", "Always Us"
];


  // DOM navigation
  const goToBirthdayPage = () => {
    window.history.back();
  };

  // Optimized open lightbox
  const openLightbox = useCallback((index) => {
    setCurrentIndex(index);
    setSelectedImage(images[index]);
    setLightboxOpen(true);
  }, []);

  // Optimized close lightbox
  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setTimeout(() => {
      setSelectedImage(null);
    }, 300);
  }, []);

  // Optimized navigation
  const nextImage = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % images.length);
  }, []);

  const prevImage = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + images.length) % images.length);
  }, []);

  // Touch and swipe handlers
  const handleTouchStart = useCallback((e) => {
    if (!lightboxOpen) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  }, [lightboxOpen]);

  const handleTouchMove = useCallback((e) => {
    if (!lightboxOpen) return;
    e.preventDefault();
  }, [lightboxOpen]);

  const handleTouchEnd = useCallback((e) => {
    if (!lightboxOpen) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = touchStartY.current - touchEndY;

    // Only handle horizontal swipes (ignore vertical scrolls)
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  }, [lightboxOpen, nextImage, prevImage]);

  // Mouse drag handlers
  const handleMouseDown = useCallback((e) => {
    if (!lightboxOpen) return;
    setIsDragging(true);
    setStartX(e.clientX);
  }, [lightboxOpen]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || !lightboxOpen) return;
    e.preventDefault();
  }, [isDragging, lightboxOpen]);

  const handleMouseUp = useCallback((e) => {
    if (!isDragging || !lightboxOpen) return;
    
    const endX = e.clientX;
    const diffX = startX - endX;

    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    
    setIsDragging(false);
  }, [isDragging, lightboxOpen, startX, nextImage, prevImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!lightboxOpen) return;
      
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowRight':
          nextImage();
          break;
        case 'ArrowLeft':
          prevImage();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, closeLightbox, nextImage, prevImage]);

  // 3D animations for gallery
  useEffect(() => {
    if (!galleryRef.current) return;

    const cards = galleryRef.current.querySelectorAll('.memory-card');
    
    gsap.fromTo(cards, 
      {
        y: 100,
        opacity: 0,
        rotationY: -15,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        rotationY: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        delay: 0.2
      }
    );

    // Hover effects
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        gsap.to(card, {
          y: -10,
          rotationY: 5,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out"
        });
      });

      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          y: 0,
          rotationY: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  }, []);

  // Lightbox 3D animations
  useEffect(() => {
    if (!lightboxRef.current || !lightboxOpen) return;

    const lightbox = lightboxRef.current;
    
    gsap.fromTo(lightbox,
      {
        opacity: 0,
        scale: 0.8,
        rotationX: 10
      },
      {
        opacity: 1,
        scale: 1,
        rotationX: 0,
        duration: 0.5,
        ease: "back.out(1.7)"
      }
    );

    // Image slide animation
    const image = lightbox.querySelector('img');
    if (image) {
      gsap.fromTo(image,
        {
          opacity: 0,
          scale: 1.1,
          rotationY: 15
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          duration: 0.6,
          ease: "power3.out",
          delay: 0.2
        }
      );
    }
  }, [lightboxOpen, currentIndex]);

  const handleImageLoad = useCallback((index) => {
    setLoadedImages(prev => ({ ...prev, [index]: true }));
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-purple-900 via-pink-800 to-blue-900 py-8 px-4 overflow-hidden"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 transform-gpu">
          Memory Wall 📸
        </h1>
        <p className="text-lg text-pink-100 mb-8">
          Swipe, click, explore • {images.length} moments
        </p>
      </div>

      {/* 3D Photo Grid */}
      <div ref={galleryRef} className="max-w-6xl mx-auto transform-gpu">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4 perspective-1000">
          {images.map((image, index) => (
            <div
              key={index}
              ref={el => imageRefs.current[index] = el}
              className="memory-card group relative bg-white/10 backdrop-blur-lg rounded-xl p-2 border border-white/20 shadow-2xl cursor-pointer transform-gpu transition-transform duration-200 preserve-3d"
              onClick={() => openLightbox(index)}
              style={{
                transformStyle: 'preserve-3d'
              }}
            >
              {/* Image Container */}
              <div className="aspect-square rounded-lg overflow-hidden relative bg-gradient-to-br from-white/20 to-white/10">
                {!loadedImages[index] && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                )}
                <img
                  src={image}
                  alt={`Memory ${index + 1}`}
                  className={`w-full h-full object-cover transition-all duration-500 transform-gpu ${
                    loadedImages[index] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(index)}
                  loading="lazy"
                />
                
                {/* 3D Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Memory Badge */}
                <div className="absolute bottom-2 left-2 bg-black/50 rounded-full px-2 py-1 backdrop-blur-sm">
                  <span className="text-white text-xs font-medium">
                    {index + 1}
                  </span>
                </div>
              </div>

              {/* Title */}
              <div className="mt-2 text-center">
                <h3 className="text-white font-medium text-xs truncate">
                  {memoryTitles[index]}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3D Lightbox with Swipe */}
      {lightboxOpen && (
        <div
          ref={lightboxRef}
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 transform-gpu"
          onClick={closeLightbox}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div 
            className="relative max-w-4xl w-full max-h-full transform-gpu"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-2xl hover:text-pink-400 transition-colors duration-200 z-10 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm"
            >
              ✕
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-pink-400 transition-colors duration-200 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm md:left-4 md:w-12 md:h-12"
            >
              ‹
            </button>

            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-2xl hover:text-pink-400 transition-colors duration-200 bg-black/50 rounded-full w-10 h-10 flex items-center justify-center backdrop-blur-sm md:right-4 md:w-12 md:h-12"
            >
              ›
            </button>

            {/* 3D Image Container */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-2xl transform-gpu">
              <img
                src={images[currentIndex]}
                alt={`Memory ${currentIndex + 1}`}
                className="w-full h-auto max-h-[60vh] object-contain transform-gpu"
                draggable="false"
              />
              
              {/* Info Bar */}
              <div className="p-4 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-800">
                    {memoryTitles[currentIndex]}
                  </h3>
                  <span className="text-gray-600 text-sm font-medium">
                    {currentIndex + 1} / {images.length}
                  </span>
                </div>
                {/* Progress */}
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Swipe Hint */}
            <div className="text-center mt-4">
              <p className="text-white/60 text-sm">
                ← Swipe or use arrows → • Esc to close
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="text-center mt-8">
        <button
          onClick={goToBirthdayPage}
          className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-full font-semibold text-base shadow-xl hover:scale-105 transform-gpu transition-all duration-200 border border-white/30 active:scale-95"
        >
          ← Back to Celebration
        </button>
      </div>

      {/* Optimized Footer */}
      <div className="text-center mt-6 text-white/50 text-sm">
        <p>✨ {images.length} memories • Swipe to explore</p>
      </div>

      {/* Performance optimizations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-gpu {
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default PhotoGallery;