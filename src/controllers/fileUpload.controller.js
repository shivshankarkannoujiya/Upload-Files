import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/files.model.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const localFileUpload = asyncHandler(async (req, res) => {
    //TODO: fetch file
    const file = req.files.file;
    console.log("File: ", file);

    //TODO: Path to store the files
    const uploadPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        "temp",
        Date.now().toString() + `.${file.name.split(".")[1]}`
    );
    console.log("PATH: ", uploadPath);

    file.mv(uploadPath, (error) => {
        if (error) {
            console.log(`ERROR: ${error}`);
            return res
                .status(500)
                .json(new ApiResponse(500, "File Upload Failed"));
        }

        // TODO: Only respond if the file was moved successfully
        return res
            .status(200)
            .json(new ApiResponse(200, "Local File Uploaded Successfully"));
    });
});

export { localFileUpload };
