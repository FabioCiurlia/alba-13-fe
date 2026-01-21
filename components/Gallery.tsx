import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';

interface GalleryImage {
    url: string;
    alt?: string;
    _key?: string;
}

interface GalleryProps {
    images: GalleryImage[];
    display: 'grid' | 'slider';
}

export const Gallery: React.FC<GalleryProps> = ({ images, display }) => {
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = () => setLightboxIndex(null);
    const nextImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null && prev < images.length - 1 ? prev + 1 : 0));
    };
    const prevImage = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        setLightboxIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : images.length - 1));
    };

    if (display === 'slider') {
        return (
            <div className="my-12">
                <Slider images={images} onImageClick={openLightbox} />
                {lightboxIndex !== null && (
                    <Lightbox
                        images={images}
                        currentIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onNext={nextImage}
                        onPrev={prevImage}
                    />
                )}
            </div>
        );
    }

    // Grid Layout
    return (
        <div className="my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((img, idx) => (
                    <div
                        key={img._key || idx}
                        className="relative group overflow-hidden rounded-xl aspect-square cursor-pointer bg-gray-100"
                        onClick={() => openLightbox(idx)}
                    >
                        <img
                            src={img.url}
                            alt={img.alt || `Gallery image ${idx + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <Maximize2 className="text-white drop-shadow-md" size={32} />
                        </div>
                    </div>
                ))}
            </div>
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    currentIndex={lightboxIndex}
                    onClose={closeLightbox}
                    onNext={nextImage}
                    onPrev={prevImage}
                />
            )}
        </div>
    );
};

// Sub-components

const Slider: React.FC<{ images: GalleryImage[], onImageClick: (idx: number) => void }> = ({ images, onImageClick }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const next = () => setActiveIndex(prev => (prev < images.length - 1 ? prev + 1 : 0));
    const prev = () => setActiveIndex(prev => (prev > 0 ? prev - 1 : images.length - 1));

    return (
        <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden group bg-gray-100">
            <img
                src={images[activeIndex].url}
                alt={images[activeIndex].alt || ''}
                className="w-full h-full object-cover"
                onClick={() => onImageClick(activeIndex)}
            />

            {/* Controls */}
            <div className="absolute inset-0 flex items-center justify-between p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <button onClick={prev} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto backdrop-blur-sm">
                    <ChevronLeft size={24} />
                </button>
                <button onClick={next} className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 pointer-events-auto backdrop-blur-sm">
                    <ChevronRight size={24} />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`w-2 h-2 rounded-full transition-all ${idx === activeIndex ? 'bg-white w-6' : 'bg-white/50'}`}
                    />
                ))}
            </div>
        </div>
    );
};

const Lightbox: React.FC<{
    images: GalleryImage[],
    currentIndex: number,
    onClose: () => void,
    onNext: (e?: React.MouseEvent) => void,
    onPrev: (e?: React.MouseEvent) => void
}> = ({ images, currentIndex, onClose, onNext, onPrev }) => {

    // Close on escape key could be added here with useEffect

    return (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center animate-in fade-in duration-200" onClick={onClose}>
            <button onClick={onClose} className="absolute top-6 right-6 text-white/70 hover:text-white p-2">
                <X size={40} />
            </button>

            <div className="relative w-full max-w-6xl max-h-screen p-4 flex items-center justify-center" onClick={e => e.stopPropagation()}>
                <img
                    src={images[currentIndex].url}
                    alt={images[currentIndex].alt}
                    className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                />

                <button onClick={onPrev} className="absolute left-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all backdrop-blur-sm">
                    <ChevronLeft size={48} />
                </button>
                <button onClick={onNext} className="absolute right-4 top-1/2 -translate-y-1/2 p-3 text-white/50 hover:text-white bg-black/20 hover:bg-black/40 rounded-full transition-all backdrop-blur-sm">
                    <ChevronRight size={48} />
                </button>

                <div className="absolute bottom-[-3rem] left-0 right-0 text-center text-white/60 text-sm">
                    {currentIndex + 1} / {images.length}
                </div>
            </div>
        </div>
    );
}
