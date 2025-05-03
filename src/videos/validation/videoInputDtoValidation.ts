import { VideoInput } from '../dto/video.intput';
import { Resolution } from '../types/video';
import { FieldError } from '../types/FieldError';
import { isValidDate } from '../../core/utils/error.utils'

export const videoInputDtoValidation = (data: VideoInput): FieldError[] => {
  const errors: FieldError[] = [];

  const {
    title,
    author,
    canBeDownloaded,
    minAgeRestriction,
    createdAt,
    publicationDate,
    availableResolutions,
  } = data.attributes;
  if (
    !title ||
    typeof title !== 'string' ||
    title.trim().length < 2 ||
    title.trim().length > 40
  ) {
    errors.push({ field: 'title', message: 'Invalid title' });
  }

  if (
    !author ||
    typeof author !== 'string' ||
    author.trim().length < 2 ||
    author.trim().length > 20
  ) {
    errors.push({ field: 'author', message: 'Invalid author' });
  }

  if (typeof canBeDownloaded !== 'boolean') {
    errors.push({ field: 'canBeDownloaded', message: 'Invalid canBeDownloaded' });
  }

  if (
    minAgeRestriction !== null &&
    (typeof minAgeRestriction !== 'number' ||
    minAgeRestriction < 0)
  ) {
    errors.push({ field: 'minAgeRestriction', message: 'Invalid minAgeRestriction' });
  }

  if (!createdAt || !isValidDate(createdAt)) {
    errors.push({ field: 'createdAt', message: 'Invalid createdAt' });
  }

  if (!publicationDate || !isValidDate(publicationDate)) {
    errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
  }

  if (!Array.isArray(availableResolutions)) {
    errors.push({ field: 'availableResolutions', message: 'availableResolutions must be an array' });
  } else if (availableResolutions.length) {
      if(availableResolutions.length < 1){
        errors.push({
          field:'availableResolutions',
          message:"At least on resolution should be provided",
        });
      }
      const invalid = availableResolutions.filter(
        (res: string) => !Object.values(Resolution).includes(res as Resolution)
      );

  }

  return errors;
};
