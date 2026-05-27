import app from "./app.js";
import config from "./config/config.js";
import connectDb from "./config/db.js";

connectDb(config.MONGO_URI);

app.listen(config.PORT);
