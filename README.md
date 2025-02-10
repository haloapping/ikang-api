# Ikang API

REST API about fish.

## REST API Specification

| Path/Endpoint    | Method   | Description                              | Example                                                             |
| ---------------- | -------- | ---------------------------------------- | ------------------------------------------------------------------- |
| `/fishes`        | `GET`    | Get all fishes                           | `http://localhost:3000/fishes`                                      |
| `/fishes/:id`    | `GET`    | Get fish by ID                           | `http://localhost:3000/fishes/550e8400-e29b-41d4-a716-446655440000` |
| `/fishes`        | `POST`   | Create new fish                          | `http://localhost:3000/fishes`                                      |
| `/fishes/:id`    | `DELETE` | Delete fish by ID                        | `http://localhost:3000/fishes/550e8400-e29b-41d4-a716-446655440000` |
| `/fishes/:id`    | `PUT`    | Update fish by ID, create if unavailable | `http://localhost:3000/fishes/550e8400-e29b-41d4-a716-446655440000` |
| `/fishes/:id`    | `PATCH`  | Update fish by ID                        | `http://localhost:3000/fishes/550e8400-e29b-41d4-a716-446655440000` |
| `/fishes/search` | `GET`    | Search fish by query                     | `http://localhost:3000/fishes/search?q=ikan-tongkol`                |

## Tech Stack

- [Hono](https://hono.dev)
- [Zod](https://zod.dev)

## Get Started

To install dependencies:

```sh
bun install
```

To run:

```sh
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

Made with ❤️ by [haloapping](https://haloapping.com/)
