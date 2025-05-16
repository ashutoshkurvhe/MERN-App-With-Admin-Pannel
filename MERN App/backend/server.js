require("dotenv").config();
const express = require("express");
const cors = require('cors');
const authRoute = require("./routers/auth.routes.js");
const contactRoute = require("./routers/contact.routes.js");
const serviceRoute = require("./routers/service.routes.js");
const adminRoute = require("./routers/admin.routes.js");
const connectDb = require("./utils/db.js");
const errorMiddleware = require("./middlewares/error.middleware.js");

const app = express();
const PORT = 5200;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credential: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use("/api/auth", authRoute); //for auth related endpoints
app.use("/api/form", contactRoute); //for contact form submissions jise authentication ki jrurt nhi h 
app.use("/api/data", serviceRoute); // for serving app data

//let's define admin route
app.use("/api/admin", adminRoute);

app.use(errorMiddleware); 
//yadi koi bhi error hota h to connection nhi hoga

connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
})