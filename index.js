const express = require("express");
const routes = require("./routes/routes");
const app = express();
app.use(express.json());
app.use("/api", routes);
app.listen(8000, () => {
  console.log("server started at port 8000");
});
