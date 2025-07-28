import fetch from 'node-fetch';

export async function sendDiscordAlert(message) {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content: `🚨 ${message}` }),
  });
}
