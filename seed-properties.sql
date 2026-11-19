-- Script para popular o banco com imóveis detalhados (50 aluguel, 50 venda)

-- 1. Atualizar estrutura
ALTER TABLE properties ADD COLUMN IF NOT EXISTS neighborhood VARCHAR(100);

-- 2. Atualizar imóveis existentes
UPDATE properties SET neighborhood = CASE
    WHEN id % 10 = 0 THEN 'Centro'
    WHEN id % 10 = 1 THEN 'Jardins'
    WHEN id % 10 = 2 THEN 'Vila Madalena'
    WHEN id % 10 = 3 THEN 'Pinheiros'
    WHEN id % 10 = 4 THEN 'Leblon'
    WHEN id % 10 = 5 THEN 'Ipanema'
    WHEN id % 10 = 6 THEN 'Barrinha'
    WHEN id % 10 = 7 THEN 'Itaim Bibi'
    WHEN id % 10 = 8 THEN 'Moema'
    ELSE 'Vila Olímpia'
END;

-- 3. Inserção em lote (100 novos imóveis: 50 venda, 50 aluguel)
INSERT INTO properties (title, price, type, m2, bedrooms, bathrooms, description, image_url, location, category, neighborhood)
SELECT
    CASE WHEN i <= 50 THEN 'Imóvel de Luxo Venda ' || i ELSE 'Apartamento Aluguel ' || (i-50) END,
    CASE WHEN i <= 50 THEN (RANDOM() * 4000000 + 500000)::DECIMAL(15,2) ELSE (RANDOM() * 10000 + 1000)::DECIMAL(15,2) END,
    CASE WHEN i % 2 = 0 THEN 'casa' ELSE 'apto' END,
    (RANDOM() * 500 + 50)::INTEGER,
    (RANDOM() * 5 + 1)::INTEGER,
    (RANDOM() * 3 + 1)::INTEGER,
    'Imóvel de alto padrão com acabamento premium e localização privilegiada.',
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    'Cidade Exemplo ' || (i % 10),
    CASE WHEN i <= 50 THEN 'compra' ELSE 'aluguel' END,
    CASE
        WHEN i % 10 = 0 THEN 'Centro'
        WHEN i % 10 = 1 THEN 'Jardins'
        WHEN i % 10 = 2 THEN 'Vila Madalena'
        WHEN i % 10 = 3 THEN 'Pinheiros'
        WHEN i % 10 = 4 THEN 'Leblon'
        WHEN i % 10 = 5 THEN 'Ipanema'
        WHEN i % 10 = 6 THEN 'Barrinha'
        WHEN i % 10 = 7 THEN 'Itaim Bibi'
        WHEN i % 10 = 8 THEN 'Moema'
        ELSE 'Vila Olímpia'
    END
FROM generate_series(1, 100) AS s(i);