export const themes = {
    alba13: {
        primary: 'cyan-600',
        secondary: 'cyan-400',
        darker: 'cyan-900',
        light: 'cyan-100',
        lighter: 'cyan-50',
        bg: 'bg-slate-50',
        text: 'text-slate-900',
        selection: 'selection:bg-cyan-100 selection:text-cyan-900',
        gradient: {
            from: 'from-cyan-100/50',
            via: 'via-cyan-50/30',
            to: 'to-transparent'
        },
        cardFilter: 'grayscale-[20%] group-hover:grayscale-0',
        cardOverlay: 'from-cyan-900/80',
        navbar: {
            bg: 'bg-slate-900',
            border: 'border-slate-800',
            text: 'text-white',
            drawerBg: 'bg-slate-900'
        },
        footer: {
            bg: 'bg-cyan-300/80',
            text: 'text-slate-900/90',
            border: 'border-white/10'
        }
    },
    ros6team: {
        primary: 'yellow-600',
        secondary: 'yellow-400',
        light: 'yellow-100',
        lighter: 'yellow-50',
        bg: 'bg-neutral-50',
        text: 'text-neutral-900',
        selection: 'selection:bg-yellow-100 selection:text-yellow-900',
        gradient: {
            from: 'from-yellow-100/50',
            via: 'via-yellow-50/30',
            to: 'to-transparent'
        },
        cardFilter: 'sepia-[20%] group-hover:sepia-0',
        cardOverlay: 'from-yellow-900/80',
        navbar: {
            bg: 'bg-neutral-900',
            border: 'border-neutral-800',
            text: 'text-white',
            drawerBg: 'bg-neutral-900'
        },
        footer: {
            bg: 'bg-neutral-900',
            text: 'text-neutral-400',
            border: 'border-white/10'
        }
    }
}

export type ThemeType = typeof themes.alba13;

export const getThemeBySlug = (slug: string): ThemeType => {
    return (themes as any)[slug] || themes.alba13;
};
