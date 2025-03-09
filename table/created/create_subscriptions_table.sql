-- Create subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'free',
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  price_id TEXT,
  status TEXT, 
  current_period_start TIMESTAMP WITH TIME ZONE,
  current_period_end TIMESTAMP WITH TIME ZONE,
  cancel_at_period_end BOOLEAN,
  canceled_at TIMESTAMP WITH TIME ZONE,
  cancel_at TIMESTAMP WITH TIME ZONE,
  trial_start TIMESTAMP WITH TIME ZONE,
  trial_end TIMESTAMP WITH TIME ZONE,
  interval TEXT,
  interval_count NUMERIC,
  price_amount NUMERIC,
  currency TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX subscriptions_user_id_idx ON subscriptions(user_id);

-- Enable Row Level Security
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own subscriptions
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create function to automatically update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to call the function
CREATE TRIGGER update_subscriptions_updated_at
BEFORE UPDATE ON subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();