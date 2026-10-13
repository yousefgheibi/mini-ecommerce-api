import multer from "multer";
import path from "path";
import { AppError} from "../utils/app-error";


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() *1e9)}`;
        cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

const allowedMimeTypes = ["image/jpe", "image/png", "image/webp"];

export const uploadProductImage = multer({
    storage,
    limits: {fileSize: 2 *1024 *1024},
    fileFilter: function(req, file, cb) {
        if(allowedMimeTypes.includes(file.mimetype)){
            cb(null, true);
        }
        else{
            cb(new AppError("فقط فرمت های JPEG, PNG,WEBP مجاز است.", 400));
        }
    },
}).single("image");