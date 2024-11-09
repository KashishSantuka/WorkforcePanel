import { Router } from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import {
  getUsers,
  createUsers,
  dropMobileIndex,
  updateEmployee,
  deleteEmployee,
} from "../controller/Create.js";

const router = Router();

// Set up file upload configuration
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadFolder = path.join(__dirname, "..", "uploads");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, uploadFolder));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/employee/get", getUsers);
router.post("/employee", upload.single("imgUpload"), createUsers);
router.get("/drop-mobile-index", dropMobileIndex);
router.put("/employee/edit/:id", updateEmployee);
router.delete("/employee/delete/:id", deleteEmployee);

export default router;
