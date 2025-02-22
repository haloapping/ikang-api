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
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_fishes ON fishes (id, name);

CREATE TABLE predators (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
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
	created_at TIMESTAMP DEFAULT NOW(),
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




