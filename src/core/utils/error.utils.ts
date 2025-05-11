import { FieldError } from '../../videos/types/FieldError';

export const createErrorMessages = (
  errors: FieldError[],
): { errorsMessages: FieldError[] } => {
  return { errorsMessages: errors };
};

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return false;

  // Check that the string is a valid ISO 8601 format
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;
  return isoRegex.test(dateString);
}

