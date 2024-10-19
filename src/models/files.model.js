import mongoose from "mongoose";

const fileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },

        imageUrl: {
            type: String,
        },

        tags: {
            type: String,
        },

        email: {
            type: String,
        },
    },
    { timestamps: true }
);

const File = mongoose.model("File", fileSchema);
export { File };
