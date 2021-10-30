import { Controller, Post, Req, Res, Body } from 'routing-controllers';
import { Request, Response } from 'express';
import BookValidator from '../validators/bookValidator';
import { ValidationResult } from '../interfaces/IValidation';
import BookCommandHandler from '../handlers/commands/bookCommandHandler';
import { CommandResult } from '../interfaces/ICommand';

/**
 * Controller for all routes at the base route '/book'
 */
@Controller('/book')
class BookController {
  private bookValidator;
  private bookCommandHandler;

  constructor() {
    this.bookValidator = new BookValidator();
    this.bookCommandHandler = new BookCommandHandler();
  }

  @Post('/')
  public async create(@Req() request: Request, @Res() response: Response, @Body() body: any) {
    // Validate fields
    const validationResult: ValidationResult = this.bookValidator.validateCreate(body);
    if (validationResult.error) {
      return response.status(400).json({ Error: validationResult.message });
    }

    // Create book
    const commandResult: CommandResult = await this.bookCommandHandler.createBook(body);
    if (commandResult.error) {
      return response.status(422).json({ Error: commandResult.message });
    } else {
      return response.status(200).json({ Success: 'Successfully created Book.' });
    }
  }
}


export default BookController;
