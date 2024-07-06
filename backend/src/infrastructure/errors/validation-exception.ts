import { HttpException, ValidationError } from "@nestjs/common";

interface ValidationErrorResponse {
  field: string;
  messages: string[];
}

export class ValidationException extends HttpException {
  constructor(errors: ValidationError[]) {
    const errorsResponse: ValidationErrorResponse[] = [];
    errors.map((error) => {
      errorsResponse.push({
        field: error.property,
        messages: Object.values(error.constraints)
      });
    });
    super({
      statusCode: 422,
      message: "Validation error",
      errors: errorsResponse
    }, 422);
  }
}