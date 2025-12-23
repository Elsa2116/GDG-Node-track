let books = [];

export const getAllBooks = (req, res) => {
  res.status(200).json(books);
};

export const getBookById = (req, res) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.status(200).json(book);
};

export const createBook = (req, res) => {
  const newBook = { id: books.length + 1, ...req.body };
  books.push(newBook);
  res.status(201).json(newBook);
};

export const deleteBook = (req, res) => {
  const index = books.findIndex((b) => b.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });
  books.splice(index, 1);
  res.status(200).json({ message: "Book deleted successfully" });
};
