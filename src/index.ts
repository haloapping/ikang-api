import { Hono } from "hono";
import { logger } from "hono/logger";
import {
  addNewFishHandler,
  deleteFishHandler,
  getAllFishesHandler,
  getByIdFishHandler,
  patchFishHandler,
  putFishHandler,
  searchFishHandler,
} from "./handlers/fish";

const app = new Hono();

app.use(logger());
app.get("/fishes/search", ...searchFishHandler);
app.get("/fishes", ...getAllFishesHandler);
app.get("/fishes/:id", ...getByIdFishHandler);
app.post("/fishes", ...addNewFishHandler);
app.put("/fishes/:id", ...putFishHandler);
app.patch("/fishes/:id", ...patchFishHandler);
app.delete("fishes/:id", ...deleteFishHandler);

export default app;
