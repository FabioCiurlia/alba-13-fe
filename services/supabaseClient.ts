import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://lotuzxxaclvmdihfkwju.supabase.co'
const SUPABASE_KEY = 'sb_publishable_zVy9bboCkkhMvtfdNyTz0Q_XYUDxN6h'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
