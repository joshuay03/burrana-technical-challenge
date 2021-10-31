import { Controller, Post, Get, Req, Res, Body, QueryParams } from 'routing-controllers';
import { Request, Response } from 'express';
import BookValidator from '../validators/bookValidator';
import { BookCreateValidationResult, BookGetAllValidationResult } from '../interfaces/IValidation';
import BookCommandHandler from '../handlers/commands/bookCommandHandler';
import { BookCommandResult } from '../interfaces/ICommand';
import BookQueryHandler from '../handlers/queries/bookQueryHandler';
import { BookQueryResult } from '../interfaces/IQuery';

/**
 * Controller for all routes at the base route '/book'
 */
@Controller('/book')
class BookController {
  private bookValidator;
  private bookCommandHandler;
  private bookQueryHandler;

  constructor() {
    this.bookValidator = new BookValidator();
    this.bookCommandHandler = new BookCommandHandler();
    this.bookQueryHandler = new BookQueryHandler();
  }

  @Post('/')
  public async create(@Req() request: Request, @Res() response: Response, @Body() body: any) {
    // Validate fields
    const validationResult: BookCreateValidationResult = this.bookValidator.validateCreate(body);
    if (validationResult.error) {
      return response.status(400).json({ Error: validationResult.message });
    }

    // Create book
    const commandResult: BookCommandResult = await this.bookCommandHandler.createBook(body);
    if (commandResult.error) {
      return response.status(422).json({ Error: commandResult.message });
    } else {
      return response.status(200).json({ Success: 'Successfully created Book.' });
    }
  }

  @Get('/')
  public async getAll(@Req() request: Request, @Res() response: Response, @QueryParams() params: any) {
    // Validate parameters
    const validationResult: BookGetAllValidationResult = this.bookValidator.validateGetAll(params);
    if (validationResult.error) {
      return response.status(400).json({ Error: validationResult.message });
    }

    // Get all books
    const queryResult: BookQueryResult = await this.bookQueryHandler.getAllBooks(validationResult.params);
    if (queryResult.error) {
      return response.status(422).json({ Error: queryResult.message });
    } else {
      return response.status(200).json({ books: queryResult.data });
    }
  }
}


export default BookController;
