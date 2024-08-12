import { Request, Response } from "express";
import { createBook, deleteBook, getBooks } from "../services/book.service";

export async function getBooksHandler(req: Request, res: Response) {
  const result = await getBooks();
  if (!result.length) {
    return res.status(404).send("Books not found");
  }
  return res.status(200).send(result);
}

export async function createBookHandler(req: Request, res: Response) {
  const result = await createBook(req.body);
  if (!result) {
    return res.status(409).send("Book already exists");
  }
  return res.status(201).send(result);
}

export async function deleteBookHandler(req: Request, res: Response) {
  const result = await deleteBook(req.params.BookName);
  console.log(result);
  if (!result) {
    return res.status(404).send("Book not found");
  }
  return res.status(200).send(result);
}
