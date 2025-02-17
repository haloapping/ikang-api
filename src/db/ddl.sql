CREATE TABLE fishes (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	scientific_name VARCHAR DEFAULT NULL,
	habitat VARCHAR DEFAULT NULL,
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

CREATE TABLE predators (
	id UUID PRIMARY KEY,
	name VARCHAR NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL
);

CREATE TABLE fishes_predators (
	id UUID PRIMARY KEY,
	fish_id UUID NOT NULL,
	predator_id UUID NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT NULL,
	FOREIGN KEY (fish_id) REFERENCES fishes (id),
	FOREIGN KEY (predator_id) REFERENCES predators (id)
);

SELECT f.name AS fish_name, p.name AS predator_name FROM fishes_predators AS fd
INNER JOIN fishes AS f ON fd.fish_id = f.id
INNER JOIN predators AS p ON fd.predator_id  = p.id;




