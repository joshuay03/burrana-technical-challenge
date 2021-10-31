import { BookQueryParams } from '../interfaces/IBook';

/**
 * Interface for Book create validation result
 */
export interface BookCreateValidationResult {
  error: boolean,
  message: string | null,
};

/**
 * Interface for Book get all validation result
 */
 export interface BookGetAllValidationResult {
  error: boolean,
  message: string | null,
  params: BookQueryParams,
};
