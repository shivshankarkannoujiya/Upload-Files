import { Router } from "express";
import {
    imageUpload,
    localFileUpload,
    uploadReducedImage,
    videoUpload,
} from "../controllers/fileUpload.controller.js";

const router = Router();

router.route("/localFileUpload").post(localFileUpload);
router.route("/imageUpload").post(imageUpload);
router.route("/videoUpload").post(videoUpload);
router.route("/uploadReducedImage").post(uploadReducedImage);

export default router;
