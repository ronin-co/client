import { init } from '@paralleldrive/cuid2';

/**
 * Generate a cryptographically strong unique identifier.
 *
 * @param length Length of the identifier to generate, defaults to 24.
 *
 * @returns Cryptographically unique identifier with the specified length.
 */
export const generateUniqueId = (length = 24): string => init({ length })();
