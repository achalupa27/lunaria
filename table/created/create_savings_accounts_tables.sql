-- Create savings_accounts table
CREATE TABLE savings_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  balance NUMERIC NOT NULL,
  interest_rate NUMERIC,
  interest_period TEXT,
  currency TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX savings_accounts_user_id_idx ON savings_accounts(user_id);

-- Enable Row Level Security
ALTER TABLE savings_accounts ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own savings_accounts
CREATE POLICY "Users can view their own savings_accounts"
  ON savings_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting assets
CREATE POLICY "Users can insert their own savings_accounts"
  ON savings_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating assets
CREATE POLICY "Users can update their own savings_accounts"
  ON savings_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting assets
CREATE POLICY "Users can delete their own savings_accounts"
  ON savings_accounts
  FOR DELETE
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
CREATE TRIGGER update_savings_accounts_updated_at
BEFORE UPDATE ON savings_accounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();