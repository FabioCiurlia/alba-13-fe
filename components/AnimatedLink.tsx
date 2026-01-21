import React from 'react';
import { Link, LinkProps, useNavigate } from 'react-router-dom';
import { flushSync } from 'react-dom';

// Extend the Window interface to include startViewTransition
declare global {
    interface Document {
        startViewTransition?: (callback: () => void) => {
            finished: Promise<void>;
            ready: Promise<void>;
            updateCallbackDone: Promise<void>;
        };
    }
}

interface AnimatedLinkProps extends LinkProps {
    children: React.ReactNode;
}

export const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, children, ...props }) => {
    const navigate = useNavigate();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();

        const doc = document as any;
        if (!doc.startViewTransition) {
            navigate(to);
            return;
        }

        doc.startViewTransition(() => {
            flushSync(() => {
                navigate(to);
            });
        });
    };

    return (
        <a href={to.toString()} onClick={handleClick} {...props}>
            {children}
        </a>
    );
};
