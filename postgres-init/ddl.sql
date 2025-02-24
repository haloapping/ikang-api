DO $$ BEGIN
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'ikang') THEN
  		RAISE NOTICE 'Creating database...';
        CREATE DATABASE ikang;
  		RAISE NOTICE 'Database created successfully.';
    END IF;
END $$;

DO $$ BEGIN
  RAISE NOTICE 'Creating tables...';
END $$;

CREATE TABLE IF NOT EXISTS fishes (
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

CREATE TABLE IF NOT EXISTS predators (
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

CREATE TABLE IF NOT EXISTS habitats (
	id UUID PRIMARY KEY,
	name habitat_enum NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE INDEX idx_habitats ON habitats (id, name);

CREATE TABLE IF NOT EXISTS fishes_habitats (
	id UUID PRIMARY KEY,
	fish_id UUID NOT NULL,
	habitat_id UUID NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY(fish_id) REFERENCES fishes(id) ON DELETE CASCADE,
	FOREIGN KEY(habitat_id) REFERENCES habitats(id)  ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS fishes_predators (
	id UUID PRIMARY KEY,
	fish_id UUID NOT NULL,
	predator_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY(fish_id) REFERENCES fishes(id) ON DELETE CASCADE,
	FOREIGN KEY(predator_id) REFERENCES predators(id) ON DELETE CASCADE
);

DO $$ BEGIN
  RAISE NOTICE 'Tables created successfully.';
END $$;
