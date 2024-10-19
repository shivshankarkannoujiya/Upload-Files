import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/files.model.js";
import path from "path";
import { fileURLToPath } from "url";

//TODO: Get the current file name and directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localFileUpload = asyncHandler(async (req, res) => {
    //TODO: Fetch the uploaded file from the request
    const file = req.files.file;
    console.log("File: ", file);

    //TODO: Define the path to store the uploaded file
    const uploadPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "temp",
        Date.now().toString() + `.${file.name.split(".")[1]}`
    );
    console.log("PATH: ", uploadPath);

    //TODO: Move the file to the defined path
    file.mv(uploadPath, (error) => {
        if (error) {
            console.log(`ERROR: ${error}`);
            //TODO: Respond with an error if the file move fails
            return res
                .status(500)
                .json(new ApiResponse(500, "File Upload Failed"));
        }

        //TODO: Respond with success if the file was moved successfully
        return res
            .status(200)
            .json(new ApiResponse(200, "Local File Uploaded Successfully"));
    });
});


export { localFileUpload };
