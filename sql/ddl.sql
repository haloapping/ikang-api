CREATE TABLE fishes (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	scientific_name VARCHAR DEFAULT NULL,
	size VARCHAR DEFAULT NULL,
	diet VARCHAR DEFAULT NULL,
	lifespan VARCHAR DEFAULT NULL,
	status VARCHAR DEFAULT NULL,
	color VARCHAR DEFAULT NULL,
	water_type VARCHAR DEFAULT NULL,
	reproduction VARCHAR DEFAULT NULL,
	behavior VARCHAR DEFAULT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_fishes ON fishes (id, name);

CREATE TABLE predators (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_predators ON predators (id, name);

CREATE TYPE habitat_enum AS ENUM (
  'Freshwater',
  'Saltwater',
  'Brackish',
  'River',
  'Lake',
  'Deep Sea',
  'Reef',
  'Open Ocean'
);

CREATE TABLE habitats (
	id UUID PRIMARY KEY,
	name habitat_enum NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_habitats ON habitats (id, name);

CREATE TABLE fishes_habitats (
	id UUID PRIMARY KEY,
	fish_id UUID NOT NULL,
	habitat_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY(fish_id) REFERENCES fishes(id) ON DELETE CASCADE,
	FOREIGN KEY(habitat_id) REFERENCES habitats(id)  ON DELETE CASCADE
);

CREATE TABLE fishes_predators (
	id UUID PRIMARY KEY,
	fish_id UUID NOT NULL,
	predator_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY(fish_id) REFERENCES fishes(id) ON DELETE CASCADE,
	FOREIGN KEY(predator_id) REFERENCES predators(id) ON DELETE CASCADE
);

DROP TABLE fishes_habitats, fishes_predators, fishes, predators, habitats;
DROP TYPE habitat_enum;

DELETE FROM fishes_habitats;
DELETE FROM fishes_predators;
DELETE FROM fishes;
DELETE FROM habitats;
DELETE FROM predators;
<<<<<<< HEAD
=======

EXPLAIN ANALYZE SELECT
	f.id,
	f.name,
	f.scientific_name,
	f.size,
	f.diet,
	f.lifespan,
	f.status,
	f.color,
	f.water_type,
	f.reproduction,
	f.behavior,
COALESCE(
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', h.id,
            'name', h.name
        )
    ) FILTER (WHERE h.id IS NOT NULL),
    '[]'
) AS habitats,
COALESCE(
    JSON_AGG(
        JSON_BUILD_OBJECT(
            'id', p.id,
            'name', p.name
        )
    ) FILTER (WHERE p.id IS NOT NULL),
    '[]'
) AS predators
FROM
    fishes f
LEFT JOIN
    fishes_habitats fh ON f.id = fh.fish_id
LEFT JOIN
    habitats h ON fh.habitat_id = h.id
LEFT JOIN
    fishes_predators fp ON f.id = fp.fish_id
LEFT JOIN
    predators p ON fp.predator_id = p.id
GROUP BY
    f.id;

SELECT
    f.id,
    f.name,
    f.scientific_name,
    f.size,
    f.diet,
    f.lifespan,
    f.status,
    f.color,
    f.water_type,
    f.reproduction,
    f.behavior,
COALESCE(
    (
        SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', h.id,
                'name', h.name
            )
        )
        FROM fishes_habitats fh
        JOIN habitats h ON fh.habitat_id = h.id
        WHERE fh.fish_id = f.id
    ),
    '[]'
) AS habitats,
COALESCE(
    (
        SELECT JSON_AGG(
            JSON_BUILD_OBJECT(
                'id', p.id,
                'name', p.name
            )
        )
        FROM fishes_predators fp
        JOIN predators p ON fp.predator_id = p.id
        WHERE fp.fish_id = f.id
    ),
    '[]'
    ) AS predators
FROM
    fishes f;



>>>>>>> 378187a (feat: fix relation query)
