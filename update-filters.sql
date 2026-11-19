-- 1. Adicionar colunas de bairro e valor_minimo/valor_maximo para filtros avançados
ALTER TABLE properties ADD COLUMN IF NOT EXISTS neighborhood VARCHAR(100);

-- 2. Atualizar os imóveis existentes com bairros fictícios mas realistas
UPDATE properties
SET neighborhood = CASE
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