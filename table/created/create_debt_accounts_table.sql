-- Create debt_accounts table
CREATE TABLE debt_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  current_balance NUMERIC NOT NULL,
  initial_balance NUMERIC NOT NULL,
  creditor TEXT NOT NULL,
  currency TEXT,
  interest_rate NUMERIC,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX debt_accounts_user_id_idx ON debt_accounts(user_id);

-- Enable Row Level Security
ALTER TABLE debt_accounts ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own debt_accounts
CREATE POLICY "Users can view their own debt_accounts"
  ON debt_accounts
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting debt_accounts
CREATE POLICY "Users can insert their own debt_accounts"
  ON debt_accounts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating debt_accounts
CREATE POLICY "Users can update their own debt_accounts"
  ON debt_accounts
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting debt_accounts
CREATE POLICY "Users can delete their own debt_accounts"
  ON debt_accounts
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
CREATE TRIGGER update_debt_accounts_updated_at
BEFORE UPDATE ON debt_accounts
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();