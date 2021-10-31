import { Book } from '../../models/bookModel';
import { BookQueryParams } from '../../interfaces/IBook';
import { BookQueryResult } from '../../interfaces/IQuery';
import { transformBooks } from '../../util/book';

/**
 * Query class for Book queries
 */
class BookQueryHandler {

  constructor() {
  }

  public async getAllBooks(params: BookQueryParams): Promise<BookQueryResult> {
    let result: BookQueryResult = {
      error: false,
      message: null,
      data: null,
    };

    if (params.sortBy === 'name') {
      if (params.asc) {
        result.data = await Book.find({}).sort({ 'name': 1 });
      } else {
        result.data = await Book.find({}).sort({ 'name': -1 });
      }
    } else if (params.sortBy === 'author') {
      if (params.asc) {
        result.data = await Book.find({}).sort({ 'author': 1 });
      } else {
        result.data = await Book.find({}).sort({ 'author': -1 });
      }
    } else {
      result.data = await Book.find({});
    }

    // Transform books
    if (result.data.length > 0) {
      result.data = transformBooks(result.data);
    }

    return result;
  }
}


export default BookQueryHandler;
