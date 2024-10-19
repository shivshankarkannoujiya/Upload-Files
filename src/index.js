import { app } from "./app.js";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import { cloudinaryConnect } from "./utils/cloudinary.js";

dotenv.config({
    path: "./.env",
});

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`ERR: ${error.message}`);
            process.exit(1);
        });

        // return promise to chain Cloudinary Connection
        return cloudinaryConnect();
    })
    .then(() => {
        console.log(`Cloudinary Connected Successfully !!`);

        app.listen(process.env.PORT, () => {
            console.log(`Server is listening at PORT: ${process.env.PORT}`);
        });
    })
    .catch((error) => {
        console.log(`MongoDB connection Failed !! ERROR: ${error.message} `);
        process.exit(1);
    });
