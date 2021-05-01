import multer from "multer";
import path from "path";

const Storage = multer.diskStorage({
    destination: path.join(__dirname, "..", "/public/images"),
    filename: (req, file, cb) => {
        let fileName = `${Date.now()}-${file.originalname}`;

        cb(null, fileName); // null means that no error object to give
    }
});

const multerFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
        cb(null, true)
    } else {
        cb(null, false)
    }
};

const upload = multer({
    storage: Storage,
    limits: 4194304, // max 4MB (4*1024*1024)
    fileFilter: multerFilter
}).single("image");

export { upload };