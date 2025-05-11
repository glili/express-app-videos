import { FieldError } from '../../videos/types/FieldError';

export const createErrorMessages = (
  errors: FieldError[],
): { errorsMessages: FieldError[] } => {
  return { errorsMessages: errors };
};

export function isValidDate(dateString: string): boolean {
  // Enforce YYYY-MM-DD format
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateString)) return false;

  const date = new Date(dateString);
  const timestamp = date.getTime();
  if (isNaN(timestamp)) return false;

  // Ensure the parsed date matches the input (e.g., 2023-02-31 would roll over to March)
  const [year, month, day] = dateString.split('-').map(Number);
  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() + 1 === month && // getUTCMonth is 0-based
    date.getUTCDate() === day
  );
}
