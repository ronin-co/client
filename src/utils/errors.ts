interface InvalidResponseErrorDetails {
  message: string;
  code: string;
}

export class InvalidResponseError extends Error {
  message: InvalidResponseErrorDetails['message'];
  code: InvalidResponseErrorDetails['code'];

  constructor(details: InvalidResponseErrorDetails) {
    super(details.message);

    this.name = 'InvalidResponseError';
    this.message = details.message;
    this.code = details.code;
  }
}

/**
 * Parses the response as JSON or, alternatively, throws an error containing
 * potential error details that might have been included in the response.
 *
 * @param response The response of a fetch request.
 *
 * @returns The response body as a JSON object.
 */
export const getResponseBody = async <T>(
  response: Response,
  options?: { errorPrefix?: string },
): Promise<T> => {
  // If the response is okay, we want to parse the JSON asynchronously.
  if (response.ok) return response.json() as T;

  const text = await response.text();

  let json: T & {
    error?: InvalidResponseErrorDetails;
  };

  try {
    json = JSON.parse(text);
  } catch (_err) {
    throw new InvalidResponseError({
      message: `${options?.errorPrefix ? `${options.errorPrefix} ` : ''}${text}`,
      code: 'JSON_PARSE_ERROR',
    });
  }

  if (json.error) {
    json.error.message = `${options?.errorPrefix ? `${options.errorPrefix} ` : ''}${json.error.message}`;
    throw new InvalidResponseError(json.error);
  }

  return json;
};
