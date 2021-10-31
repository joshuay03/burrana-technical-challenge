import { ObjectId } from 'bson';
import { sortBy, asc } from '../types/bookParams';

/**
 * Interface for Book on create
 */
export interface CreateBook {
  name: string,
  author: string,
  description?: string,
};

/**
 * Interface for Book query parameters
 */
 export interface BookQueryParams {
  sortBy: sortBy,
  asc: asc,
};

/**
 * Interface for Book on get
 */
export interface GetBook {
  id: ObjectId,
  timestamp: Date,
  name: string,
  author: string,
  description?: string,
};
