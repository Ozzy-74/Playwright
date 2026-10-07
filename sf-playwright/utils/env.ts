import dotenv from "dotenv";

dotenv.config();

/** Reads an environment variable and fails early with a clear message if it is missing. */
export function getEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}. Check your .env file.`);
  }
  return value;
}
