import { v2 as cloudinary } from "cloudinary";

const uploadFileToCloudinary = async (file, folder, quality) => {
    const options = { folder };

    if (quality) {
        options.quality = quality;
    }
    options.resource_type = "auto";
    return await cloudinary.uploader.upload(file.tempFilePath, options);
};

export { uploadFileToCloudinary };
