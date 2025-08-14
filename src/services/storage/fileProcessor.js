import sharp from "sharp";

const IMAGE_WIDTH = parseInt(process.env.IMAGE_RESIZE_WIDTH || "800", 10);
const IMAGE_FORMAT = process.env.IMAGE_FORMAT || "jpeg";
const IMAGE_QUALITY = parseInt(process.env.IMAGE_QUALITY || "80", 10);

export const resizeImage = async (buffer) => {
    return sharp(buffer)
        .resize({ width: IMAGE_WIDTH })
        .toFormat(IMAGE_FORMAT)
        .jpeg({ quality: IMAGE_QUALITY })
        .toBuffer();
};
