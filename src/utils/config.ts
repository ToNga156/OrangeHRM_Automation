import dotenv from 'dotenv';

dotenv.config();

export const config = {
    baseUrl: process.env.BASE_URL || '',
    username: process.env.USERNAME || '',
    password: process.env.PASSWORD || '',
    headless: process.env.HEADLESS === 'true',
    timeout: Number(process.env.TIMEOUT) || 30000,
};