import * as Sentry from "@sentry/bun";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { fishRoutes } from "./routes/fish";

import { habitatRoutes } from "./routes/habitat";
import { predatorRoutes } from "./routes/predator";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";
import { HTTPException } from "hono/http-exception";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Hi 🐟️" });
});

app.route("/fishes", fishRoutes);
app.route("/habitats", habitatRoutes);
app.route("/predators", predatorRoutes);

Sentry.init({
  dsn: "https://70a0b5be60e383ef1b5812ca265880b7@o4508947005177856.ingest.us.sentry.io/4508947534381056",
});

app.onError((error, c) => {
  // Error from Hono
  if (error instanceof HTTPException) {
    return c.json({ kind: "hono", error: error }, 400);
  }
  // Error from Zod
  if (error instanceof ZodError) {
    return c.json({ kind: "zod", error: error }, 400);
  }
  // Error from Prisma
  if (error instanceof PrismaClientKnownRequestError) {
    return c.json({ kind: "prisma", error: error }, 400);
  }

  Sentry.captureException(error);
  return c.text(error.message, 500);
});

try {
  throw new Error("Halo-halo 🐟️");
} catch (e) {
  Sentry.captureException(e);
}

export default app;
