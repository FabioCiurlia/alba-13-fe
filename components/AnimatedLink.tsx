'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { flushSync } from 'react-dom';

declare global {
    interface Document {
        startViewTransition?: (callback: () => void) => {
            finished: Promise<void>;
            ready: Promise<void>;
            updateCallbackDone: Promise<void>;
        };
    }
}

interface AnimatedLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    to: string; // Keeping 'to' for compatibility with existing usage
    children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, children, className, onClick, ...props }) => {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (onClick) onClick(e);
        e.preventDefault();

        const doc = document as any;
        if (!doc.startViewTransition) {
            router.push(to);
            return;
        }

        doc.startViewTransition(() => {
            flushSync(() => {
                router.push(to);
            });
        });
    };

    return (
        <a href={to} onClick={handleClick} className={className} {...props}>
            {children}
        </a>
    );
};
