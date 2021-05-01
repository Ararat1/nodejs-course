/*
 * This module haven't been used in the application yet
 */
import { unlinkSync } from "fs";
import sharp from "sharp";

const imageResizer = async ({ file }, res, next) => {
    try {
        if (!file) {
            next();
            return;
        }

        let { path, filename } = file;

        await sharp(path)
            .resize(400, 250, { fit: "cover", position: "center" })
            .jpeg({ quality: 100 })
            .toFile(`${__dirname}/../${filename}`)
            .then(() => {
                unlinkSync(path);
                next();
            })
            .catch((err) => next(err));

        next();
    } catch (error) {
        next(err);
    }
};

export { imageResizer }