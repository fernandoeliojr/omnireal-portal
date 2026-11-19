-- SQL para criar a tabela de imóveis no Supabase SQL Editor

CREATE TABLE properties (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  price DECIMAL(15, 2) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'casa' ou 'apto'
  m2 INTEGER NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  description TEXT,
  image_url TEXT,
  location VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública
CREATE POLICY "Public Read" ON properties
  FOR SELECT USING (true);
