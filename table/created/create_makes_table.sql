-- Create makes table
CREATE TABLE makes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  amount NUMERIC NOT NULL,
  currency TEXT,
  source TEXT NOT NULL,
  date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX makes_user_id_idx ON makes(user_id);

-- Enable Row Level Security
ALTER TABLE makes ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own makes
CREATE POLICY "Users can view their own makes"
  ON makes
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting affirmations
CREATE POLICY "Users can insert their own makes"
  ON makes
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating affirmations
CREATE POLICY "Users can update their own makes"
  ON makes
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting affirmations
CREATE POLICY "Users can delete their own makes"
  ON makes
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
CREATE TRIGGER update_makes_updated_at
BEFORE UPDATE ON makes
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();