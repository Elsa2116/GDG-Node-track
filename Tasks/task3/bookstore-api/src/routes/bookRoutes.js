import express from "express";
import {
  getAllBooks,
  getBookById,
  createBook,
  deleteBook,
} from "../controllers/bookController.js";
import validateBook from "../middleware/validateBook.js";

const router = express.Router();

router.get("/search", (req, res) => res.send("You are on the search page")); // routing precedence
router.get("/", getAllBooks);
router.get("/:id", getBookById);
router.post("/", validateBook, createBook);
router.delete("/:id", deleteBook);

export default router;
