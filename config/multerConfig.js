import multer from "multer";
import { uuidv8 } from "uuid-v8";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "idCards/");
  },
  filename: (req, file, cb) => {
    const unID = uuidv8();
    const uniqueFilename = `${unID}.png`;
    cb(null, uniqueFilename);
  },
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext != ".png") return createBrowserEnv(new Error("only png images"));
    cb(null, true);
  },
  limits: { fileSize: 10 * 1024 * 1024 },
});
export const upload = multer({ storage: storage });
