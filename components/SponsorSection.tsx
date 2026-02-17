import React from 'react';

export const SponsorSection: React.FC = () => {
    return (
        <div className="bg-slate-50 border-y border-slate-200 bg-white">
            <div className="container mx-auto px-6 md:px-8 py-16">

                <div className="pt-8">
                    <p className="text-center text-xl uppercase font-light tracking-[0.3em] text-slate-400 mb-8">I Nostri Partner e Sostenitori</p>
                    <div className="flex flex-wrap justify-center items-start gap-12 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
                        {/* Logo 1 */}
                        <div className="flex items-center justify-center p-8 transition-colors">
                            <img
                                src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211714/maggio-logo.webp"
                                alt="Partner Logo 1"
                                className="max-h-full h-32 w-auto object-contain filter"
                            />
                        </div>

                        {/* Logo 2 */}
                        <div className="flex items-center justify-center p-8 transition-colors">
                            <img
                                src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211721/scarlino-logo.webp"
                                alt="Partner Logo 2"
                                className="max-h-full h-32 w-auto object-contain filter transition-all duration-500 "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
