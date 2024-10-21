import { v2 as cloudinary } from "cloudinary";

const uploadFileToCloudinary = async (file, folder) => {
    const options = { folder };
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

export { uploadFileToCloudinary };
