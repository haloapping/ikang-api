import { Hono } from "hono";
import { logger } from "hono/logger";
import { fishRoutes } from "./routes/fish";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({ message: "Hi 🐟️" });
});

app.route("/fishes", fishRoutes);

export default app;
