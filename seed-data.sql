-- 1. Atualizar a estrutura da tabela
ALTER TABLE properties ADD COLUMN IF NOT EXISTS category VARCHAR(20) DEFAULT 'compra';

-- 2. Atualizar imóveis existentes (assumindo IDs 1-6 baseados no script anterior)
UPDATE properties SET category = 'compra' WHERE id IN (1, 2, 4);
UPDATE properties SET category = 'aluguel' WHERE id IN (3, 5, 6);

-- 3. Inserção em lote (100 novos imóveis: 50 venda, 50 aluguel)
INSERT INTO properties (title, price, type, m2, bedrooms, bathrooms, description, image_url, location, category)
SELECT
    CASE WHEN i <= 50 THEN 'Imóvel de Luxo Venda ' || i ELSE 'Apartamento Aluguel ' || (i-50) END,
    CASE WHEN i <= 50 THEN (RANDOM() * 4000000 + 500000)::DECIMAL(15,2) ELSE (RANDOM() * 10000 + 1000)::DECIMAL(15,2) END,
    CASE WHEN i % 2 = 0 THEN 'casa' ELSE 'apto' END,
    (RANDOM() * 500 + 50)::INTEGER,
    (RANDOM() * 5 + 1)::INTEGER,
    (RANDOM() * 3 + 1)::INTEGER,
    'Descrição premium do imóvel ' || i,
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    'Cidade Exemplo ' || (i % 10),
    CASE WHEN i <= 50 THEN 'compra' ELSE 'aluguel' END
FROM generate_series(1, 100) AS s(i);
