-- Create assets table
CREATE TABLE assets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  name TEXT NOT NULL,
  value NUMERIC NOT NULL,
  currency TEXT,
  category TEXT NOT NULL,
  appreciation_rate NUMERIC,
  liquidity TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

-- Create index on user_id
CREATE INDEX assets_user_id_idx ON assets(user_id);

-- Enable Row Level Security
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;

-- Create policy for selecting only user's own assets
CREATE POLICY "Users can view their own assets"
  ON assets
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy for inserting assets
CREATE POLICY "Users can insert their own assets"
  ON assets
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Create policy for updating assets
CREATE POLICY "Users can update their own assets"
  ON assets
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy for deleting assets
CREATE POLICY "Users can delete their own assets"
  ON assets
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
CREATE TRIGGER update_assets_updated_at
BEFORE UPDATE ON assets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();