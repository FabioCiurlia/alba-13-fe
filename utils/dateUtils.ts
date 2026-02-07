export const formatDate = (dateString?: string): string => {
    if (!dateString) return '';
    try {
        const date = new Date(dateString);
        // Italian locale, full date format (e.g., 12 gennaio 2026)
        const formatted = new Intl.DateTimeFormat('it-IT', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);

        // Manual capitalization of the month (e.g., "gennaio" -> "Gennaio")
        return formatted.replace(/\b(\w)/g, (char) => char.toUpperCase());
    } catch (e) {
        return dateString;
    }
};

