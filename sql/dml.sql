INSERT INTO fishes (
    id, name, scientific_name, habitat, size, diet, lifespan, status, color, 
    water_type, reproduction, behavior, created_at, updated_at
) VALUES 
(
    '550e8400-e29b-41d4-a716-446655440000',
    'Clownfish',
    'Amphiprioninae',
    'Coral reefs',
    '4-5 inches',
    'Plankton, algae',
    '6-10 years',
    'Least Concern',
    'Orange with white bands',
    'Saltwater',
    'Egg-laying',
    'Lives in symbiosis with sea anemones',
    NOW(),
    NULL
),
(
    '6f9619ff-8b86-d011-b42d-00cf4fc964ff',
    'Great White Shark',
    'Carcharodon carcharias',
    'Oceans (coastal and offshore)',
    '15-20 feet',
    'Fish, seals, sea lions',
    '30-70 years',
    'Vulnerable',
    'Grayish upper body, white underside',
    'Saltwater',
    'Ovoviviparous (live birth from eggs inside mother)',
    'Solitary, apex predator',
    NOW(),
    NULL
);

SHOW TIMEZONE;