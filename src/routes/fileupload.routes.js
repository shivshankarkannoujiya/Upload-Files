import { Router } from "express";
import {
    imageUpload,
    localFileUpload,
} from "../controllers/fileUpload.controller.js";

const router = Router();

router.route("/localFileUpload").post(localFileUpload);
router.route("/imageUpload").post(imageUpload);

export default router;
