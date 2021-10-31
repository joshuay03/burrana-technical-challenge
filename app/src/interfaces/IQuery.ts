import { GetBook } from '../interfaces/IBook';
/**
 * Generic interface for query result
 */
export interface QueryResult {
  error: boolean,
  message: string | null,
};

/**
 * Interface for Book query result
 */
export interface BookQueryResult extends QueryResult {
  error: boolean,
  message: string | null,
  data: Array<GetBook> | null,
};
