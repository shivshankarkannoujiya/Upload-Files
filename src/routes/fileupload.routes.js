import { Router } from "express";
import { localFileUpload } from "../controllers/fileUpload.controller.js";


const router = Router()


router.route("/localFileUpload").post(localFileUpload)


export default router


