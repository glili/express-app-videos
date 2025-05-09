import { VideoInput } from '../dto/video.intput';
import { Resolution } from '../types/video';
import { FieldError } from '../types/FieldError';
// import { isValidDate } from '../../core/utils/error.utils'

export const videoInputDtoValidation = (data: VideoInput): FieldError[] => {
  const errors: FieldError[] = [];

  if (
    !data.title ||
    typeof data.title !== 'string' ||
    data.title.trim().length < 2 ||
    data.title.trim().length > 40
  ) {
    errors.push({ message: 'Invalid title',field: 'title' });
  }

  if (
    !data.author ||
    typeof data.author !== 'string' ||
    data.author.trim().length < 2 ||
    data.author.trim().length > 20
  ) {
    errors.push({ message: 'Invalid author', field: 'author' });
  }

  if (typeof data.canBeDownloaded !== 'boolean') {
    errors.push({ message: 'Invalid canBeDownloaded', field: 'canBeDownloaded' });
  }

  if (
    data.minAgeRestriction !== null &&
    (typeof data.minAgeRestriction !== 'number' ||
    data.minAgeRestriction < 0)
  ) {
    errors.push({ message: 'Invalid minAgeRestriction', field: 'minAgeRestriction' });
  }

  // if (!data.createdAt || !isValidDate(data.createdAt)) {
  //   errors.push({ field: 'createdAt', message: 'Invalid createdAt' });
  // }

  // if (!data.publicationDate || !isValidDate(data.publicationDate)) {
  //   errors.push({ field: 'publicationDate', message: 'Invalid publicationDate' });
  // }

  if (!Array.isArray(data.availableResolutions)) {
    errors.push({  message: 'availableResolutions must be an array', field: 'availableResolutions' });
  } else if (data.availableResolutions.length) {
      if(data.availableResolutions.length < 1){
        errors.push({
          message:"At least on resolution should be provided",
          field:'availableResolutions',
        });
      }
      const invalid = data.availableResolutions.filter(
        (res: string) => !Object.values(Resolution).includes(res as Resolution)
      );

  }

  return errors;
};
