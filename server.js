import app from "./app.js";
import colors from "colors";
if (process.env.NODE_ENV !== "Production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`.green));
}
