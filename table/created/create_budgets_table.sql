-- Create budgets table
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  category TEXT NOT NULL,
  amount NUMERIC NOT NULL,
  currency TEXT,
  period TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX budgets_user_id_idx ON budgets(user_id);

-- Enable Row Level Security
ALTER TABLE budgets ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own budgets
CREATE POLICY "Users can view their own budgets"
  ON budgets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting budgets
CREATE POLICY "Users can insert their own budgets"
  ON budgets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating budgets
CREATE POLICY "Users can update their own budgets"
  ON budgets
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting budgets
CREATE POLICY "Users can delete their own budgets"
  ON budgets
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
CREATE TRIGGER update_budgets_updated_at
BEFORE UPDATE ON budgets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();