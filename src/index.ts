import { Hono } from "hono";
import { logger } from "hono/logger";

import { fishRoute } from "./routes/fish";

const app = new Hono();

app.use(logger());

app.get("/", (c) => {
  return c.json({
    message: "Ikang API",
    description: "API for fish data",
  });
});

app.route("/fishes", fishRoute);

export default app;
