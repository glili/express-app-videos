export type FieldError = {
    field: string;
    message: string;
  };

  export type ValidationError = {
    errorsMessages: FieldError[] | null;
  };