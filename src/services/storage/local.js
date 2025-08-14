import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuid } from "uuid";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadDir = path.join(__dirname, "../../../uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

export const localStorage = {
    async save(file) {
        const ext = path.extname(file.originalname);
        const filename = `${uuid()}${ext}`;
        const filepath = path.join(uploadDir, filename);

        fs.writeFileSync(filepath, file.buffer);
        return { filename, path: filepath };
    },

    async remove(filename) {
        const filepath = path.join(uploadDir, filename);
        if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    },

    async get(filename) {
        const filepath = path.join(uploadDir, filename);

        if (!fs.existsSync(filepath)) {
            throw new Error("File not found");
        }

        return fs.createReadStream(filepath);
    },

    async getBuffer(filename) {
        const filepath = path.join(uploadDir, filename);

        if (!fs.existsSync(filepath)) {
            throw new Error("File not found");
        }

        return fs.readFileSync(filepath);
    },

    getPath(filename) {
        return path.join(uploadDir, filename);
    },
};
