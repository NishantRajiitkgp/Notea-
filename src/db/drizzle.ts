import { schema } from './schema';
import { config } from "dotenv";
import { drizzle } from 'drizzle-orm/neon-http';

config({ path: ".env" });

function sanitizeDatabaseUrl(rawUrl: string): string {
    let adjustedUrl = rawUrl.replace(/^postgresql:\/\//, "postgres://");
    try {
        const url = new URL(adjustedUrl);
        url.searchParams.delete("channel_binding");
        return url.toString();
    } catch {
        return adjustedUrl;
    }
}

const rawDatabaseUrl = process.env.DATABASE_URL;
if (!rawDatabaseUrl) {
    throw new Error("DATABASE_URL is not set");
}

const databaseUrl = sanitizeDatabaseUrl(rawDatabaseUrl);

export const db = drizzle(databaseUrl, { schema });
