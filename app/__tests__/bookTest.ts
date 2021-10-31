import * as request from 'supertest';

const baseApiUrl = 'http://localhost:3000';
const testBooks = {
  book1 : {
    name: 'Adventures of Tom Sawyer',
    author: 'Mark Twain',
    description: 'Description of Adventures of Tom Sawyer by Mark Twain',
  },
  book2 : {
    name: 'The Merchant of Venice',
    author: 'Shakespeare',
  },
  book3 : {
    name: 'Crime and Punishment',
    author: 'Dostoevsky',
    description: '',
  },
}

/**
 * Test Suite for Book commands and queries
 */
describe("GET /book", () => {
  it('Get books before creating', async () => {
    const result = await request(baseApiUrl).get('/book');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books).toBeInstanceOf(Array);
    expect(result.body.books.length).toEqual(0);
  });
});


describe("POST /book", () => {
  it('Create new book with valid fields including description', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send(testBooks.book1)
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ Success: 'Successfully created Book.' });
  });

  it('Create new book with valid fields excluding description', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send(testBooks.book2)
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ Success: 'Successfully created Book.' });
  });

  it('Create new book with valid fields with empty description', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send(testBooks.book3)
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(200);
    expect(result.body).toEqual({ Success: 'Successfully created Book.' });
  });

  it('Create new book with missing name', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send({
        author: testBooks.book1.author,
        description: testBooks.book1.description,
      })
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(400);
    expect(result.body)
      .toEqual({ Error: 'Valid Name of Book required.' });
  });

  it('Create new book with missing author', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send({
        name: testBooks.book1.name,
        description: testBooks.book1.description,
      })
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(400);
    expect(result.body)
      .toEqual({ Error: 'Valid Author of Book required.' });
  });

  it('Create new book with invalid type for name', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send({
        name: 1,
        author: testBooks.book1.author,
        description: testBooks.book1.description,
      })
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(400);
    expect(result.body)
      .toEqual({ Error: `Invalid type. Expected type 'string' but received type 'number' for Book Name.` });
  });

  it('Create new book with invalid type for author', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send({
        name: testBooks.book1.author,
        author: true,
        description: testBooks.book1.description,
      })
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(400);
    expect(result.body)
      .toEqual({ Error: `Invalid type. Expected type 'string' but received type 'boolean' for Book Author.` });
  });

  it('Create already created book', async () => {
    const result = await request(baseApiUrl)
      .post('/book')
      .send(testBooks.book1)
      .set('Accept', 'application/json');
    expect(result.statusCode).toEqual(422);
    expect(result.body).toEqual({ Error: `Book with name ${testBooks.book1.name} already exists.` });
  });
});


describe("GET /book", () => {
  it('Get created books', async () => {
    const result = await request(baseApiUrl).get('/book');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books).toBeInstanceOf(Array);
    expect(result.body.books.length).toEqual(3);
    expect(typeof result.body.books[0].id).toEqual('string');
    expect(new Date(result.body.books[0].timestamp)).toBeInstanceOf(Date);
    expect(typeof result.body.books[0].name).toEqual('string');
    expect(typeof result.body.books[0].author).toEqual('string');
    expect(typeof result.body.books[0].description).toEqual('string');
  });

  it('Get created books sorted by author ascending using asc true', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=author&asc=true');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books[0].author).toEqual(testBooks.book3.author);
    expect(result.body.books[2].author).toEqual(testBooks.book2.author);
  });

  it('Get created books sorted by author descending using asc false', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=author&asc=false');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books[0].author).toEqual(testBooks.book2.author);
    expect(result.body.books[2].author).toEqual(testBooks.book3.author);
  });

  it('Get created books sorted by author ascending using asc 1', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=author&asc=1');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books[0].author).toEqual(testBooks.book3.author);
    expect(result.body.books[2].author).toEqual(testBooks.book2.author);
  });

  it('Get created books sorted by author descending using asc 0', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=author&asc=0');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books[0].author).toEqual(testBooks.book2.author);
    expect(result.body.books[2].author).toEqual(testBooks.book3.author);
  });

  it('Get created books sorted by name ascending using asc true', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=name&asc=true');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books.length).toEqual(3);
    expect(result.body.books[0].name).toEqual(testBooks.book1.name);
    expect(result.body.books[2].name).toEqual(testBooks.book2.name);
  });

  it('Get created books sorted by name descending using asc false', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=name&asc=false');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books.length).toEqual(3);
    expect(result.body.books[0].name).toEqual(testBooks.book2.name);
    expect(result.body.books[2].name).toEqual(testBooks.book1.name);
  });

  it('Get created books sorted by name ascending using asc 1', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=name&asc=1');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books.length).toEqual(3);
    expect(result.body.books[0].name).toEqual(testBooks.book1.name);
    expect(result.body.books[2].name).toEqual(testBooks.book2.name);
  });

  it('Get created books sorted by name descending using asc 0', async () => {
    const result = await request(baseApiUrl).get('/book?sortBy=name&asc=0');
    expect(result.statusCode).toEqual(200);
    expect(result.body.books.length).toEqual(3);
    expect(result.body.books[0].name).toEqual(testBooks.book2.name);
    expect(result.body.books[2].name).toEqual(testBooks.book1.name);
  });
});
