import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const seedsDir = path.join(__dirname, "seeds");

async function main() {
    const files = fs.readdirSync(seedsDir).filter((file) => file.endsWith(".js"));

    for (const file of files) {
        const seedPath = path.join(seedsDir, file);
        const { default: runSeed } = await import(`file://${seedPath}`);
        console.log(`🌱 Running seed: ${file}`);
        await runSeed(prisma);
    }

    console.log("✅ All seeds executed.");
}

main()
    .catch((e) => {
        console.error("❌ Seeding failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
