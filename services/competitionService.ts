import { supabase } from './supabaseClient';

export interface Competition {
    id: number;
    created_at: string;
    name: string;
    date: string;
    region: string;
    link: string;
    type: string;
    subname: string;
    city: string;
    level: string;
    // Add other fields from your table if needed
}

export const findCompetitions = async (region?: string, fromDate?: string, toDate?: string, type?: string) => {
    let query = supabase.from('competition').select();

    if (region) {
        query = query.eq('region', region);
    }
    if (fromDate) {
        query = query.gte('date', fromDate);
    }
    if (toDate) {
        query = query.lte('date', toDate);
    }
    if (type) {
        query = query.eq('type', type);
    }

    query = query.order('date', { ascending: true });

    const { data, error } = await query;

    if (error) {
        console.error('Error fetching competitions:', error);
        return [];
    }

    return data as Competition[];
};

export const getStartAndEndOfWeek = () => {
    const now = new Date();
    const day = now.getDay();
    const diff = now.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is sunday

    const startOfWeek = new Date(now.setDate(diff));
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999);

    return {
        start: startOfWeek.toISOString(),
        end: endOfWeek.toISOString()
    };
};

export const getStartAndEndOfMonth = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0); // Last day of current month

    endOfMonth.setHours(23, 59, 59, 999);

    return {
        start: startOfMonth.toISOString(),
        end: endOfMonth.toISOString()
    };
};
