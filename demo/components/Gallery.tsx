import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Camera, Aperture, Clock, Maximize2 } from 'lucide-react';
import { GALLERY_DATA } from '../gallery_data';

interface GalleryProps {
  onClose: () => void;
}

const ImageWithLoading: React.FC<{ src: string; alt: string; className?: string }> = ({ src, alt, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-800 animate-pulse rounded-lg flex items-center justify-center">
          <Camera className="text-gray-700 w-8 h-8 opacity-50" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'}`}
        onLoad={() => setIsLoading(false)}
        loading="lazy"
      />
    </div>
  );
};

const Gallery: React.FC<GalleryProps> = ({ onClose }) => {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Flatten photos for lightbox navigation if needed, or just use current location's photos
  const currentPhotos = selectedLocation
    ? GALLERY_DATA.find(g => g.location === selectedLocation)?.photos || []
    : [];

  const openLightbox = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const closeLightbox = () => {
    setSelectedPhotoIndex(null);
  };

  const nextPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex < currentPhotos.length - 1) {
      setSelectedPhotoIndex(selectedPhotoIndex + 1);
    }
  };

  const prevPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedPhotoIndex !== null && selectedPhotoIndex > 0) {
      setSelectedPhotoIndex(selectedPhotoIndex - 1);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-black text-white pt-20 px-6 pb-20 animate-in fade-in duration-500 relative overflow-hidden">

      {/* Mouse Following Background Effect */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-12 flex justify-between items-end border-b border-white/10 pb-8 relative z-10">
        <div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            CAPTURED <span className="text-neon-blue">MOMENTS</span>
          </h2>
          <p className="text-gray-400 max-w-xl">
            每一次快门都是对时间的切片。这里收藏了我眼中的世界，按照足迹分类。
          </p>
        </div>
      </div>

      {/* Location List */}
      <div className="max-w-7xl mx-auto space-y-40 relative z-10">
        {GALLERY_DATA.map((group, groupIdx) => (
          <section key={groupIdx} className="scroll-mt-24 group/section">
            {/* Location Header - Sticky & Parallax feel */}
            <div className="flex flex-col md:flex-row gap-12 mb-16 items-start">
              <div className="md:w-1/3 sticky top-32 z-10">
                <div className="relative">
                  <h3 className="text-6xl md:text-8xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-b from-white to-transparent opacity-20 absolute -top-12 -left-8 select-none pointer-events-none">
                    {String(groupIdx + 1).padStart(2, '0')}
                  </h3>
                  <h3 className="text-4xl font-bold mb-4 flex items-center gap-3 relative z-10">
                    <MapPin className="text-neon-blue" size={32} />
                    <span className="tracking-widest uppercase">{group.location}</span>
                  </h3>
                </div>
                <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple mb-8"></div>
                <p className="text-gray-400 leading-relaxed text-lg italic border-l-2 border-white/10 pl-6">
                  "{group.description}"
                </p>
              </div>

              {/* Photos Grid - Masonry / Waterfall Layout */}
              <div className="md:w-2/3 columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                {group.photos.map((photo, photoIdx) => (
                  <div
                    key={photo.id}
                    onClick={() => {
                      setSelectedLocation(group.location);
                      openLightbox(photoIdx);
                    }}
                    className="break-inside-avoid mb-4 group relative overflow-hidden rounded-lg cursor-pointer bg-gray-900 transition-all duration-300 ease-out hover:z-20 hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:ring-2 hover:ring-neon-blue/50 origin-center"
                  >
                    <ImageWithLoading
                      src={photo.url}
                      alt={photo.title}
                      className="w-full h-auto object-contain transition-transform duration-700"
                    />

                    {/* Glitch/Tech Overlay Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-neon-blue font-mono text-xs tracking-widest border border-neon-blue/30 px-2 py-0.5 rounded-full bg-neon-blue/10">
                            {photo.title}
                          </span>
                          <Camera size={16} className="text-gray-400" />
                        </div>
                        {photo.exif && (
                          <div className="flex gap-4 text-xs text-gray-400 font-mono">
                            <span>{photo.exif.camera}</span>
                            <span className="text-white/30">|</span>
                            <span>{photo.exif.focalLength}</span>
                            <span className="text-white/30">|</span>
                            <span>{photo.exif.aperture}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Corner Accents */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhotoIndex !== null && selectedLocation && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl overflow-y-auto animate-in fade-in duration-300" onClick={closeLightbox}>

          <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-12 relative">
            <button
              onClick={closeLightbox}
              className="fixed top-6 right-6 p-2 text-gray-400 hover:text-white transition-colors z-[60] bg-black/50 rounded-full backdrop-blur-sm"
            >
              <X size={32} />
            </button>

            {/* Navigation */}
            <button
              onClick={prevPhoto}
              className={`fixed left-4 md:left-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[60] ${selectedPhotoIndex === 0 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronLeft size={32} />
            </button>

            <button
              onClick={nextPhoto}
              className={`fixed right-4 md:right-8 top-1/2 -translate-y-1/2 p-4 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all z-[60] ${selectedPhotoIndex === currentPhotos.length - 1 ? 'opacity-0 pointer-events-none' : ''}`}
            >
              <ChevronRight size={32} />
            </button>

            {/* Image Container */}
            <div className="relative max-w-7xl w-full flex flex-col md:flex-row gap-8 items-center justify-center my-auto" onClick={e => e.stopPropagation()}>
              <div className="relative w-full flex items-center justify-center">
                <img
                  src={currentPhotos[selectedPhotoIndex].url}
                  alt={currentPhotos[selectedPhotoIndex].title}
                  className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain shadow-2xl shadow-black rounded-lg"
                />
              </div>

              {/* Info Panel */}
              <div className="w-full md:w-80 shrink-0 bg-[#1a1a1a] p-6 rounded-xl border border-white/10">
                <h3 className="text-xl font-bold mb-2">{currentPhotos[selectedPhotoIndex].title}</h3>
                <div className="flex items-center gap-2 text-neon-blue text-sm mb-6">
                  <MapPin size={14} />
                  {selectedLocation}
                </div>

                {currentPhotos[selectedPhotoIndex].exif && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-500 flex items-center gap-2"><Camera size={14} /> 机型</span>
                      <span className="text-gray-300">{currentPhotos[selectedPhotoIndex].exif?.camera}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-500 flex items-center gap-2"><Maximize2 size={14} /> 焦段</span>
                      <span className="text-gray-300">{currentPhotos[selectedPhotoIndex].exif?.focalLength}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-500 flex items-center gap-2"><Aperture size={14} /> 光圈</span>
                      <span className="text-gray-300">{currentPhotos[selectedPhotoIndex].exif?.aperture}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm border-b border-white/5 pb-2">
                      <span className="text-gray-500 flex items-center gap-2"><Clock size={14} /> 快门</span>
                      <span className="text-gray-300">{currentPhotos[selectedPhotoIndex].exif?.shutter}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-2">ISO</span>
                      <span className="text-gray-300">{currentPhotos[selectedPhotoIndex].exif?.iso}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;