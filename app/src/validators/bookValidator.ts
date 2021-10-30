import { ValidationResult } from '../interfaces/IValidation';

/**
 * Validator class for Book validations
 */
class BookValidator {

  constructor() {
  }

  public validateCreate(requestBody: any): ValidationResult {
    const { name, author, description } = requestBody;
    let validationResult: ValidationResult = {
      error: false,
      message: null,
    };

    // Validate presence and type of fields
    if (!name) {
      validationResult.error = true;
      validationResult.message = 'Valid Name of Book required.'
    } else if (!author) {
      validationResult.error = true;
      validationResult.message = 'Valid Author of Book required.'
    } else if (typeof name !== 'string') {
      validationResult.error = true;
      validationResult.message =
        `Invalid type. Expected type 'string' but received type '${typeof name}' for Book Name.`
    } else if (typeof author !== 'string') {
      validationResult.error = true;
      validationResult.message =
        `Invalid type. Expected type 'string' but received type '${typeof author}' for Book Author.`
    } else if (description && typeof description !== 'string') {
      validationResult.error = true;
      validationResult.message =
        `Invalid type. Expected type 'string' but received type '${typeof description}' for Book Description.`
    }

    return validationResult;
  }
}


export default BookValidator;
