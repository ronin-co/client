import fs from 'fs/promises';
import path from 'path';

/**
 * Checks if a file exists.
 * @param file - The path of the file to check.
 * @returns A promise that resolves to a boolean indicating whether the file exists or not.
 */
export const exists = async (file: string) => {
  try {
    await fs.access(path.join(process.cwd(), file));
  } catch (err) {
    if ((err as { code: string }).code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }

  return true;
};
