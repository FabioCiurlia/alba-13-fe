"use client";
import React, { useEffect, useRef, useState } from 'react';

interface ParallaxWrapperProps {
    children: React.ReactNode;
    imageUrl: string;
    className?: string;
    overlayColor?: string;
}

export const ParallaxWrapper: React.FC<ParallaxWrapperProps> = ({ children, imageUrl, className = '', overlayColor = "bg-black/60" }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            if (!ref.current) return;
            const { top, height } = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Check if element is in viewport (with some buffer)
            if (top < windowHeight && top + height > 0) {
                // Calculate relative scroll position
                // We want the background to move slightly relative to the container
                // When the element is at the top of the viewport, offset should be X
                // When at bottom, offset should be Y

                // A simple parallax is based on scrollY directly, but better is relative to element position
                // Let's use the distance from the center of the viewport
                const distanceFromCenter = top + height / 2 - windowHeight / 2;

                // Parallax factor (adjust for speed)
                const speed = 0.2;
                setOffset(distanceFromCenter * speed);
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Initial calculation
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={ref} className={`relative overflow-hidden ${className}`}>
            <div
                className="absolute inset-0 z-0 will-change-transform pointer-events-none"
                style={{
                    backgroundImage: `url('${imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: `translateY(${offset}px)`,
                    height: '140%', // Significantly taller to allow movement without showing edges
                    top: '-20%' // Center it initially so it has room to move up and down
                }}
            />
            <div className={`absolute inset-0 ${overlayColor} z-0`} />
            <div className="relative z-10">
                {children}
            </div>
        </section>
    );
};
