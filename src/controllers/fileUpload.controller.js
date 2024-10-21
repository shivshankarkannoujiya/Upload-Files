import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { File } from "../models/files.model.js";
import { uploadFileToCloudinary } from "../utils/upload.js";
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

// function to check isFileTypeSupported
const isFileTypeSupported = (type, supportedTypes) => {
    return supportedTypes.includes(type);
};

const imageUpload = asyncHandler(async (req, res) => {
    try {
        // TODO: fetch data
        const { name, tags, email } = req.body;
        console.table([name, tags, email]);
        const file = req.files.imageFile;
        console.log("file: ", file);

        //TODO: validation
        const supportedTypes = ["jpg", "jpeg", "png"];
        const fileType = file.name.split(".").pop().toLowerCase();

        if (!isFileTypeSupported(fileType, supportedTypes)) {
            return res
                .status(400)
                .json(new ApiResponse(400, "File format is not Supported !!"));
        }

        //if File Format Supported
        // TODO:
        // 1. Upload on cloudinary
        // 2. Save in Database
        // 3. Send the Response

        const response = await uploadFileToCloudinary(file, "webghost");
        console.log(response);

        const fileData = await File.create({
            name,
            tags,
            email,
            imageUrl: response.secure_url,
        });

        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    fileData,
                    "Image Successfully Uploaded on Cloudinary"
                )
            );
    } catch (error) {
        console.error("Error Uploading Image", error);
        return res
            .status(500)
            .json(new ApiResponse(500, "Internal Server Error"));
    }
});



export { localFileUpload, imageUpload };
