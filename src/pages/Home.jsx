import { getBookData } from "../api";
import { useState, useEffect } from "react";
import { BookReview } from "../components/BookReview";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

export const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [offset, setOffset] = useState(0);

  if (!document.cookie.includes("token")) {
    navigate("/login");
  }

  const fetchData = async (offset) => {
    try {
      const data = await getBookData(offset);
      setBooks(data);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  useEffect(() => {
    fetchData(offset);
  }, [offset]);

  return (
    <div>
      <Header />
      <div>
        {books.map((book) => (
          <BookReview
            key={book.id}
            title={book.title}
            url={book.url}
            review={book.review}
            reviewer={book.reviewer}
          />
        ))}
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {offset > 0 && (
          <button
            onClick={() => setOffset(offset - 10)}
            className="bg-blue-500 text-white px-2 py-1"
          >
            前へ
          </button>
        )}
        <button
          onClick={() => setOffset(offset + 10)}
          className="bg-blue-500 text-white px-2 py-1"
        >
          次へ
        </button>
      </div>
    </div>
  );
};
