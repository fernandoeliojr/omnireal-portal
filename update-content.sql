-- 1. Atualizar descrições para algo mais profissional e variado
-- 2. Atualizar imagens com URLs de alta qualidade do Unsplash

-- Script para atualizar os 100 imóveis inseridos (assumindo IDs 7 a 106)
UPDATE properties
SET
    description = CASE
        WHEN category = 'compra' THEN 'Esta residência redefine o conceito de luxo, com design arrojado, automação residencial de última geração e vista privilegiada para o horizonte da cidade.'
        ELSE 'Um refúgio urbano de alto padrão. Ambiente planejado para proporcionar conforto e praticidade no dia a dia, localizado em região nobre e com fácil acesso a serviços exclusivos.'
    END,
    image_url = CASE
        WHEN id % 5 = 0 THEN 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800'
        WHEN id % 5 = 1 THEN 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
        WHEN id % 5 = 2 THEN 'https://images.unsplash.com/photo-1600566753376-12c7ab77a56a?auto=format&fit=crop&q=80&w=800'
        WHEN id % 5 = 3 THEN 'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&q=80&w=800'
        ELSE 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800'
    END
WHERE id >= 7; -- IDs dos novos registros
