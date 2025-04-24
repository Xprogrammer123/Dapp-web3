/*
  # Create wallet connections schema

  1. New Tables
    - `wallet_connections`
      - `id` (uuid, primary key) 
      - `wallet_name` (text)
      - `connection_type` (text) - 'phrase', 'private_key', or 'keystore'
      - `data` (jsonb) - Stores connection data based on type
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for admin access
*/

CREATE TABLE IF NOT EXISTS wallet_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  wallet_name text NOT NULL,
  connection_type text NOT NULL CHECK (connection_type IN ('phrase', 'private_key', 'keystore')),
  data jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE wallet_connections ENABLE ROW LEVEL SECURITY;

-- Allow admins to read all connections
CREATE POLICY "Admins can read all connections" 
  ON wallet_connections
  FOR SELECT 
  TO authenticated
  USING (auth.uid() IN (
    SELECT auth.uid() 
    FROM auth.users 
    WHERE auth.email() = 'admin@example.com'
  ));

-- Allow anyone to insert connections
CREATE POLICY "Anyone can insert connections"
  ON wallet_connections
  FOR INSERT
  TO anon
  WITH CHECK (true);