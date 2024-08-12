import BookModel, { BookDocument, BookInput } from "../models/book.model";
import log from "../utils/logger";

export async function getBooks(): Promise<BookDocument[]> {
  try {
    const Books = await BookModel.find(
      {},
      { _id: 0, __v: 0, createdAt: 0, updatedAt: 0 }
    );
    return Books;
  } catch (error: any) {
    log.error(`Error fetching books: ${error.message}`);
    throw new Error("Error fetching books");
  }
}

export async function createBook(book: BookInput): Promise<BookDocument> {
  try {
    const existingBook = await BookModel.findOne({ BookName: book.bookName });

    if (existingBook) {
      return;
    }

    const newBook = await BookModel.create(book);
    return newBook;
  } catch (error: any) {
    log.error(`Error creating Book: ${error.message}`);
    throw new Error("Error creating Book");
  }
}

export async function deleteBook(bookName: string): Promise<BookDocument> {
  try {
    const Book = await BookModel.findOne(
      { bookName },
      {
        _id: 0,
        __v: 0,
        createdAt: 0,
        updatedAt: 0,
      }
    );

    if (!Book) {
      return;
    }

    await BookModel.deleteOne({ bookName });

    return Book;
  } catch (error: any) {
    log.error(`Error deleting Book: ${error.message}`);
    throw new Error("Error deleting Book");
  }
}
