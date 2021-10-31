import { BookCreateValidationResult, BookGetAllValidationResult } from '../interfaces/IValidation';

/**
 * Validator class for Book validations
 */
class BookValidator {

  constructor() {
  }

  public validateCreate(requestBody: any): BookCreateValidationResult {
    const { name, author, description } = requestBody;
    let validationResult: BookCreateValidationResult = {
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

  public validateGetAll(requestParams: any): BookGetAllValidationResult {
    const { sortBy, asc } = requestParams;
    let validationResult: BookGetAllValidationResult = {
      error: false,
      message: null,
      params: {
        sortBy: null,
        asc: true,
      },
    };

    // Validate constraints of params
    if (sortBy === 'name') {
      validationResult.params.sortBy = 'name';

      if (asc === 'false' || asc === '0') {
        validationResult.params.asc = false;
      }
    } else if (sortBy === 'author') {
      validationResult.params.sortBy = 'author';

      if (asc === 'false' || asc === '0') {
        validationResult.params.asc = false;
      }
    }

    return validationResult;
  }
}


export default BookValidator;
