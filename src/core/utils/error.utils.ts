import { FieldError } from '../../videos/types/FieldError';

export const createErrorMessages = (
  errors: FieldError[],
): { errorsMessages: FieldError[] } => {
  return { errorsMessages: errors };
};

export function isValidDate(dateString: string): boolean {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}