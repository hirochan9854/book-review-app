import { Header } from "../components/Header";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getBookDetail } from "../api";
import { updateBook, deleteBook } from "../api";
import { useNavigate } from "react-router-dom";

export const Edit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [book, setBook] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getBookDetail(id);
        setBook(data);
      } catch (error) {
        console.error("An error occurred:", error.message);
      }
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: book.title,
      url: book.url,
      detail: book.detail,
      review: book.review,
    },
  });

  const handleDelete = async () => {
    try {
      await deleteBook(id);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      setError("api", {
        message: "削除に失敗しました。もう一度お試しください。",
      });
    }
  };

  const onSubmit = async (data) => {
    try {
      await updateBook(id, data.title, data.url, data.review, data.detail);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      setError("api", {
        message: "更新に失敗しました。もう一度お試しください。",
      });
    }
  };

  return (
    <div>
      <Header />
      <div>
        <h2 className="text-center text-2xl font-semibold mt-4">編集</h2>
        {errors.api && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-96 mx-auto">
            {errors.api.message}
          </div>
        )}
        <form
          className="flex flex-col items-center w-96 mx-auto mt-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="mb-4">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="title"
              name="title"
              defaultValue={book.title}
              {...register("title", {
                required: "タイトルは必須項目です",
                minLength: {
                  value: 1,
                  message: "タイトルは1文字以上で入力してください",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="url">リンク</label>
            <input
              id="url"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="url"
              name="url"
              defaultValue={book.url}
              {...register("url", {
                required: "リンクは必須項目です",
              })}
            />
            {errors.url && (
              <p className="text-red-500 text-sm">{errors.url.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="detail">詳細</label>
            <textarea
              id="detail"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              aria-label="detail"
              name="detail"
              defaultValue={book.detail}
              {...register("detail", {
                required: "詳細は必須項目です",
                minLength: {
                  value: 1,
                  message: "詳細は1文字以上で入力してください",
                },
              })}
            />
            {errors.detail && (
              <p className="text-red-500 text-sm">{errors.detail.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="review">レビュー</label>
            <textarea
              id="review"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              aria-label="review"
              name="review"
              defaultValue={book.review}
              {...register("review", {
                required: "レビューは必須項目です",
              })}
            />
            {errors.review && (
              <p className="text-red-500 text-sm">{errors.review.message}</p>
            )}
          </div>
          <div className="flex gap-2 w-96 justify-center">
            <button
              type="submit"
              className="bg-blue-400 px-6 py-2 text-white rounded"
            >
              更新
            </button>
            <button
              className="bg-red-400 px-6 py-2 text-white rounded"
              onClick={handleDelete}
            >
              削除
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
