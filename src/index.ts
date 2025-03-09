import * as Sentry from "@sentry/bun";
import { Hono } from "hono";
import { logger } from "hono/logger";
import { fishRoutes } from "./routes/fish";
import { fishHabitatRoutes } from "./routes/fish-habitat";
import { fishPredatorRoutes } from "./routes/fish-predator";
import { habitatRoutes } from "./routes/habitat";
import { predatorRoutes } from "./routes/predator";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Hi 🐟️" });
});

app.route("/fishes", fishRoutes);
app.route("/habitats", habitatRoutes);
app.route("/predators", predatorRoutes);
app.route("/fishes-habitats", fishHabitatRoutes);
app.route("/fishes-predators", fishPredatorRoutes);

Sentry.init({
  dsn: "https://e0c8fa8e95379bb267f3cdff33478db4@o4508947005177856.ingest.us.sentry.io/4508947007340544",
  tracesSampleRate: 1.0,
  environment: "production",
});

try {
  throw new Error("Sentry Bun test");
} catch (e) {
  Sentry.captureException(e);
}

export default app;
