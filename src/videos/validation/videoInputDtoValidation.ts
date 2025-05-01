import { VideoInput } from '../dto/video.intput';
import { Resolution } from '../types/video';
import { FieldError } from '../types/FieldError';
import { isValidDate } from '../../core/utils/error.utils'

export const videoInputDtoValidation = (data: VideoInput): FieldError[] => {
  const errors: FieldError[] = [];

  const attributes = data.attributes;

  if (
    !attributes.title ||
    typeof attributes.title !== 'string' ||
    attributes.title.trim().length < 2 ||
    attributes.title.trim().length > 40
  ) {
    errors.push({ field: 'title', message: 'Invalid title' });
  }

  if (
    !attributes.author ||
    typeof attributes.author !== 'string' ||
    attributes.author.trim().length < 2 ||
    attributes.author.trim().length > 20
  ) {
    errors.push({ field: 'author', message: 'Invalid author' });
  }

  if (typeof attributes.canBeDownloaded !== 'boolean') {
    errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
  }

  if (
    attributes.minAgeRestriction !== null &&
    (typeof attributes.minAgeRestriction !== 'number' ||
    attributes.minAgeRestriction < 0)
  ) {
    errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction' });
  }

  if (!attributes.createdAt || !isValidDate(attributes.createdAt)) {
    errors.push({ field: 'createdAt', message: 'Invalid createdAt' });
  }

  if (!attributes.publicationDate || !isValidDate(attributes.publicationDate)) {
    errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
  }

  if (!Array.isArray(attributes.availableResolutions)) {
    errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
  }

  return errors;
};
