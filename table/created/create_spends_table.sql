-- Create spends table
CREATE TABLE spends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  item TEXT NOT NULL,
  cost NUMERIC NOT NULL,
  date DATE NOT NULL,
  category TEXT,
  store TEXT,
  necessity TEXT,
  currency TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX spends_user_id_idx ON spends(user_id);

-- Enable Row Level Security
ALTER TABLE spends ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own saves
CREATE POLICY "Users can view their own saves"
  ON spends
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting affirmations
CREATE POLICY "Users can insert their own spends"
  ON spends
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating spends
CREATE POLICY "Users can update their own spends"
  ON spends
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting spends
CREATE POLICY "Users can delete their own spends"
  ON spends
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
CREATE TRIGGER update_spends_updated_at
BEFORE UPDATE ON spends
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();