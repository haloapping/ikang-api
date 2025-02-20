SELECT * FROM fishes;

SELECT * FROM predators;

SELECT * FROM habitats;

-- Get all fishes and predatos
SELECT f.id, f.name AS fish_name, p.name AS predator_name FROM fishes_predators AS fd
INNER JOIN fishes AS f ON fd.fish_id = f.id
INNER JOIN predators AS p ON fd.predator_id = p.id;

-- Get all fishes and habitats
SELECT f.id, f.name AS fish_name, h.name AS habitat_name FROM fishes_habitats AS fh 
INNER JOIN fishes AS f ON fh.fish_id = f.id
INNER JOIN habitats AS h ON fh.habitat_id = h.id;