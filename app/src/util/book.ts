/**
 * Method to transform books to consist of
 * only the required fields
 * @param books
 * @returns
 */
function transformBooks(books: Array<any>) {
  return books.map((book) => {
    return {
      id: book._id,
      timestamp: book.timestamp,
      name: book.name,
      author: book.author,
      description: book.description,
    };
  });
}

export { transformBooks };
