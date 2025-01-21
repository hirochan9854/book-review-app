import { Header } from "../components/Header";
import { getBookDetail } from "../api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export const Detail = () => {
  const [book, setBook] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookDetail(id);
        setBook(data);
        setIsLoading(false);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Header />
      {!isLoading && (
        <div>
          <h2 className="text-center text-2xl font-semibold mt-4">
            {book.title}
          </h2>
          <div className="container mx-auto mt-4">
            <div className="mt-4">
              <p className="text-lg font-semibold">レビュー</p>
              <p>{book.review}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">詳細</p>
              <p>{book.detail}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">投稿者</p>
              <p>{book.reviewer}</p>
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">リンク</p>
              <a href="{book.url}">{book.url}</a>
            </div>
          </div>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center mt-80" aria-label="読み込み中">
          <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
          <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full mx-4"></div>
          <div className="animate-ping h-2 w-2 bg-blue-600 rounded-full"></div>
        </div>
      )}
    </div>
  );
};
