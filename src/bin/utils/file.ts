import fs from 'node:fs/promises';
import path from 'node:path';

/**
 * Checks if a file exists.
 * @param file - The path of the file to check.
 * @returns A promise that resolves to a boolean indicating whether the file exists or not.
 */
export const exists = async (file: string) => {
  try {
    await fs.access(path.join(process.cwd(), file));
  } catch (_err) {
    // TODO(@deebov): Handle errors other than ENOENT. Currently, we're not doing this
    // because we haven't found a way to realibly test and mock this use case.
    return false;
  }

  return true;
};
