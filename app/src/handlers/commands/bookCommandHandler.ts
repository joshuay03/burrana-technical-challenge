import { Book } from '../../models/bookModel';
import { CreateBook } from '../../interfaces/IBook';
import { CommandResult } from '../../interfaces/ICommand';
import * as mongoose from 'mongoose';

/**
 * Command class for Book commands
 */
class BookCommandHandler {

  constructor() {
  }

  public async createBook(book: CreateBook): Promise<CommandResult> {
    let result: CommandResult = {
      error: false,
      message: null,
    };

    // Verify uniqueness of Book Name
    const bookExists = await Book.exists({ name: book.name });

    if (bookExists) {
      result.error = true;
      result.message = `Book with name ${book.name} already exists.`
    } else {
      await Book
        .create({
          timestamp: Date.now(),
          name: book.name,
          author: book.author,
          description: book.description,
        })
        .catch((err) => {
          if (err) {
            result.error = true;
            result.message = 'Unexpected err. Could not save book.';
          }
        });
    }

    return result;
  }
}


export default BookCommandHandler;
