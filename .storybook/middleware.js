const { createClient } = require('@supabase/supabase-js');

module.exports = function expressMiddleware(router) {
    router.use((req, res, next) => {
        // Mock Supabase client
        global.supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://mock.supabase.co', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'mock-key');
        next();
    });
};
