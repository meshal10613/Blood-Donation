import app from "./app.js";
import config from "./config/index.js";

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`🚀 Local server running on port http://localhost:${PORT}`);
});
