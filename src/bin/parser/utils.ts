import ts from 'typescript';

import { isTest } from '@/src/bin/utils/env';
import { generateUniqueId } from '@/src/utils/id';

/**
 * Generates a unique field ID.
 *
 * @param type The type of the field.
 */
export const generateFieldId = (type: string): string => {
  // We use a fixed ID for tests to make it easier to use snapshots.
  const id = isTest() ? '0' : generateUniqueId();

  return `${type}-${id}`;
};

/**
 * Converts a given string into a readable text format.
 * Inserts spaces before each uppercase letter (except the first letter),
 * and between letters and digits, and capitalizes the first letter of each word.
 *
 * @param str - The string to be converted.
 * @returns - The formatted readable text or null if input is invalid.
 */
export function convertToReadableText(str: null): null;
export function convertToReadableText(str: undefined): null;
export function convertToReadableText(str: string): string;
export function convertToReadableText(str: undefined | null | string): string | null {
  if (str === '') return '';
  if (!str || typeof str !== 'string') return null;

  // Insert spaces before each uppercase letter (except the first letter).
  let spacedStr = str.replace(/([a-z])([A-Z])/g, '$1 $2');

  // Insert spaces between letters and digits.
  spacedStr = spacedStr.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/(\d)([a-zA-Z])/g, '$1 $2');

  // Split the string into words.
  const words = spacedStr.split(' ');

  // Capitalize the first letter of each word.
  const capitalizedWords = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));

  // Join the words back into a single string with spaces.
  return capitalizedWords.join(' ');
}
/**
 * Retrieves the line and column numbers for the start and end positions of
 * a given TypeScript node.
 *
 * @param node - The TypeScript node to get the line and column numbers for.
 * @param sourceFile - The source file containing the node.
 * @returns An object containing the start and end positions with line and column numbers.
 */
export function getLineAndColumnsNumber(
  node: ts.Node,
  sourceFile: ts.SourceFile,
): { start: { line: number; character: number }; end: { line: number; character: number } } {
  const { line: startLine, character: startCharacter } = sourceFile.getLineAndCharacterOfPosition(
    node.getStart(),
  );

  const { line: endLine, character: endCharacter } = sourceFile.getLineAndCharacterOfPosition(node.getEnd());

  return {
    start: { line: startLine + 1, character: startCharacter + 1 },
    end: { line: endLine + 1, character: endCharacter + 1 },
  };
}

/**
 * Parses JSDoc comments from a TypeScript node and extracts the name,
 * description, and details.
 *
 * @param node - The TypeScript node to parse JSDoc comments from.
 * @returns An object containing the name, description, and details extracted
 * from the JSDoc comments.
 */
export function parseJsDoc(node: ts.Node): {
  name: string;
  description: string;
  details: Record<string, string>;
} {
  let name = '';
  let description = '';
  const details: Record<string, string> = {};

  const commentsAndTags = ts.getJSDocCommentsAndTags(node);

  if (commentsAndTags.length > 0) {
    const jsDoc = commentsAndTags[0];
    const commentText = jsDoc.comment ? ts.getTextOfJSDocComment(jsDoc.comment) : undefined;

    if (commentText) {
      const lines = commentText
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line);
      if (lines.length > 0) {
        name = lines[0];
        description = lines.slice(1).join(' ');
      }
    }

    if ('tags' in jsDoc && jsDoc.tags) {
      jsDoc.tags.forEach((tag) => {
        const tagName = tag.tagName.getText();
        const tagComment = ts.getTextOfJSDocComment(tag.comment);
        if (tagComment) {
          details[tagName] = tagComment;
        }
      });
    }
  }

  return { name, description, details };
}
