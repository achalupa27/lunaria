type PlanType = 'free' | 'pro' | 'premium';
type UserRole = 'free' | 'pro' | 'premium';
type BillingInterval = 'month' | 'year';
type TermType = 'Monthly' | 'Yearly';
type SubscriptionStatus = 'trialing' | 'active' | 'canceled' | 'incomplete' | 'incomplete_expired' | 'past_due' | 'unpaid';

type Subscription = {
    id: string;
    user_id: string;
    role: UserRole;
    status: SubscriptionStatus;
    price_id: string | null;
    stripe_customer_id: string;
    stripe_subscription_id: string | null;
    current_period_start: string;
    current_period_end: string;
    cancel_at_period_end: boolean;
    cancel_at: string | null;
    canceled_at: string | null;
    trial_start: string | null;
    trial_end: string | null;
    interval: BillingInterval;
    interval_count: number;
    price_amount: number;
    currency: string;
};
