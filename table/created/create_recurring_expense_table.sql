-- Create assets table
CREATE TABLE recurring_expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT,
  period TEXT NOT NULL,
  category TEXT NOT NULL,
  next_billing_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX recurring_expenses_user_id_idx ON recurring_expenses(user_id);

-- Enable Row Level Security
ALTER TABLE recurring_expenses ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own assets
CREATE POLICY "Users can view their own assets"
  ON recurring_expenses
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting recurring_expenses
CREATE POLICY "Users can insert their own recurring_expenses"
  ON recurring_expenses
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating recurring_expenses
CREATE POLICY "Users can update their own recurring_expenses"
  ON recurring_expenses
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting recurring_expenses
CREATE POLICY "Users can delete their own recurring_expenses"
  ON recurring_expenses
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
CREATE TRIGGER update_recurring_expenses_updated_at
BEFORE UPDATE ON recurring_expenses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();