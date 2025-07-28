import { localStorage } from './local.js';

const STORAGE_PROVIDER = process.env.STORAGE_PROVIDER || 'local';

let adapter;

switch (STORAGE_PROVIDER) {
  case 'local':
    adapter = localStorage;
    break;
  // Future: Add 's3', 'gcs', etc.
  default:
    throw new Error(`Unsupported storage provider: ${STORAGE_PROVIDER}`);
}

export const storage = adapter;
