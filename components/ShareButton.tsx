import React from 'react';
import { Share2 } from 'lucide-react';
import { Competition } from '../services/competitionService';

interface ShareButtonProps {
    competition: Competition;
    className?: string;
    iconSize?: number;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ competition, className = '', iconSize = 18 }) => {

    const handleShare = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const title = `🏆 Gara: ${competition.name} - ${competition.city}`;
        const text = `
🏆 *${competition.name}*
${competition.subname ? `_${competition.subname}_\n` : ''}
📅 Data: ${new Date(competition.date).toLocaleDateString()}
📍 Luogo: ${competition.city}, ${competition.region}
🏃 Tipo: ${competition.type}

🔗 Scopri di più: ${competition.link || window.location.href}
    `.trim();

        const url = competition.link || window.location.href;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: title,
                    text: text,
                    url: url,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to WhatsApp
            const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
            window.open(whatsappUrl, '_blank');
        }
    };

    return (
        <button
            onClick={handleShare}
            className={`flex items-center justify-center transition-colors hover:opacity-80 ${className}`}
            title="Condividi Gara"
        >
            <Share2 size={iconSize} />
        </button>
    );
};
