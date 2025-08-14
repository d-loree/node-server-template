import axios from "axios";
import { logger } from "../utils/logger.js";

export async function sendDiscordAlert(message) {
    const url = process.env.DISCORD_WEBHOOK_URL;
    if (!url) return;

    try {
        await axios.post(url, {
            content: `🚨 ${message}`,
        });
    } catch (err) {
        logger.error("Failed to send Discord alert:", { error: err.message });
    }
}
