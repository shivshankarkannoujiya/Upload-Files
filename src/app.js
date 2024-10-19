import express from "express";
import fileUpload from "express-fileupload";

const app = express();

app.use(express.json());
app.use(fileUpload());

// import routes
import uploadFileRouter from "./routes/fileupload.routes.js";

// routes declaration
app.use("/api/v1/upload", uploadFileRouter);

export { app };
