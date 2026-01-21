import { NavigateFunction } from 'react-router-dom';
import { flushSync } from 'react-dom';

export const navigateBackWithTransition = (navigate: NavigateFunction) => {
    const doc = document as any;
    if (!doc.startViewTransition) {
        navigate(-1);
        return;
    }

    doc.startViewTransition(() => {
        flushSync(() => {
            navigate(-1);
        });
    });
};
