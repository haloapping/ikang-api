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
app.route("/predators", predatorRoutes);
app.route("/fishes-predators", fishPredatorRoutes);
app.route("/habitats", habitatRoutes);
app.route("/fishes-habitats", fishHabitatRoutes);

export default app;
