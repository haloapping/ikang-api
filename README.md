# Ikang API

REST API about fish.

## REST API Specification

| Path          | Method   | Description                            |
| ------------- | -------- | -------------------------------------- |
| `\fishes`     | `GET`    | Get all fishes                         |
| `\fishes\:id` | `GET`    | Get fish by ID                         |
| `\fishes`     | `POST`   | Create new fish                        |
| `\fishes\:id` | `DELETE` | Delete fish by ID                      |
| `\fishes\:id` | `PUT`    | Update fish by ID                      |
| `\fishes\:id` | `PATCH`  | Update fish by ID, create if not exist |

## Tech Stack

- [Hono](https://hono.dev/)
- [Zod](https://zod.dev/)

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
