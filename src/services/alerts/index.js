import { sendDiscordAlert } from './discord.js';
import { logger } from '../../utils/logger.js';

export async function sendAlert(message, _options = {}) {
    const promises = [];

    if (process.env.ALERT_DISCORD === 'true') {
        promises.push(sendDiscordAlert(message));
    }

    // Examples of how to add other alert types
    // if (process.env.ALERT_EMAIL === 'true') {
    //   promises.push(sendEmailAlert(message));
    // }

    // if (process.env.ALERT_SMS === 'true') {
    //   promises.push(sendSmsAlert(message));
    // }

    try {
        await Promise.all(promises);
    } catch (err) {
        logger.error('Alert failed:', { error: err.message, stack: err.stack });
    }
}
