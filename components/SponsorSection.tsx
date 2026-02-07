import React from 'react';

export const SponsorSection: React.FC = () => {
    return (
        <div className="bg-slate-50 border-y border-slate-200">
            <div className="container mx-auto px-6 md:px-8 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
                    <div className="flex items-center gap-3">
                        <span className="w-12 h-px bg-slate-900"></span>
                        <span className={`text-slate-900 font-bold text-sm tracking-wider uppercase`}>I Nostri Partner</span>
                    </div>
                    <div className="max-w-2xl">
                        <h3 className="text-3xl md:text-4xl font-medium text-slate-900 leading-tight">
                            Collaboriamo con chi condivide la nostra passione per lo sport e la comunità.
                        </h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 border-l border-t border-slate-200">
                    {/* Logo 1 */}
                    <div className="aspect-[4/3] flex items-center justify-center p-8 border-r border-b border-slate-200 bg-white transition-colors">
                        <img
                            src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211714/maggio-logo.webp"
                            alt="Partner Logo 1"
                            className="max-h-full w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                        />
                    </div>

                    {/* Logo 2 */}
                    <div className="aspect-[4/3] flex items-center justify-center p-8 border-r border-b border-slate-200 bg-white transition-colors">
                        <img
                            src="https://res.cloudinary.com/drxidw3hj/image/upload/t_qwebp/v1770211721/scarlino-logo.webp"
                            alt="Partner Logo 2"
                            className="max-h-full w-full object-contain filter grayscale hover:grayscale-0 transition-all duration-500 opacity-70 hover:opacity-100"
                        />
                    </div>

                    <div className="aspect-[4/3] flex items-center justify-center p-8 border-r border-b border-slate-200 bg-white transition-colors">
                        <span className={`text-slate-500 font-bold text-2xl md:text-l uppercase tracking-widest italic leading-tight`}>
                            SPONSOR
                        </span>
                    </div>

                    <div className="lg:col-span-2 aspect-[4/3] lg:aspect-[8/3] flex items-center justify-center p-8 border-r border-b border-slate-200 bg-white transition-colors">
                        <span className={`text-slate-500 font-bold text-md md:text-xl uppercase tracking-widest italic leading-tight text-center`}>
                            CONTATTACI PER SCOPRIRE COME DIVENTARE NOSTRO NUOVO PARTNER</span>
                    </div>
                </div>
            </div>
        </div>
    );
}