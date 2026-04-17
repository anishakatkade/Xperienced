import express from "express";
import { sendReferral } from "../controllers/referralController.js";
import { upload } from "../middleware/upload.js";

const router = express.Router();

router.post("/send", upload.single("file"), sendReferral);

export default router;