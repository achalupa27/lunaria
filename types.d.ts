interface TableDefaults {
    id: string;
    user_id: string;
    created_at?: string;
    updated_at?: string;
}

type FeatureRowType = {
    feature: string;
    includedFree: string | boolean;
    includedProfessional: string | boolean;
    includedPremium: string | boolean;
};

type Subscription = {
    id: string;
    role: 'free' | 'pro' | 'premium';
    stripe_customer_id?: string;
    stripe_subscription_id?: string;
    price_id?: string;
    status?: string;
    created_at: string;
    updated_at: string;
};

type UserRole = 'free' | 'pro' | 'premium';
