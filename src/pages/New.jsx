import { Header } from "../components/Header";
import { newBook } from "../api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const New = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: "",
      url: "",
      detail: "",
      review: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      await newBook(data.title, data.url, data.review, data.detail);
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
      setError("api", {
        message: "投稿に失敗しました。もう一度お試しください。",
      });
    }
  };
  return (
    <div>
      <Header />
      <div className="container mx-auto">
        <h2 className="text-center text-2xl font-semibold mt-4">新規投稿</h2>
        {errors.api && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-96 mx-auto">
            {errors.api.message}
          </div>
        )}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center w-96 mx-auto mt-4"
        >
          <div className="mb-4">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="title"
              name="title"
              placeholder="タイトル"
              {...register("title", {
                required: "タイトルは必須項目です",
                minLength: {
                  value: 1,
                  message: "タイトルを入力してください",
                },
              })}
            />
            {errors.title && (
              <p className="text-red-500 text-sm mb-4">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="url">URL</label>
            <input
              id="url"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="url"
              name="url"
              placeholder="URL"
              {...register("url", {
                required: "URLは必須項目です",
              })}
            />
            {errors.url && (
              <p className="text-red-500 text-sm mb-4">{errors.url.message}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="detail">詳細</label>
            <input
              id="detail"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="detail"
              name="detail"
              placeholder="詳細"
              {...register("detail", {
                required: "詳細は必須項目です",
              })}
            />
            {errors.detail && (
              <p className="text-red-500 text-sm mb-4">
                {errors.detail.message}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="review">レビュー</label>
            <textarea
              id="review"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              aria-label="review"
              name="review"
              placeholder="レビュー"
              {...register("review", {
                required: "レビューは必須項目です",
              })}
            />
            {errors.review && (
              <p className="text-red-500 text-sm mb-4">
                {errors.review.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="bg-blue-400 text-white px-2 py-1 rounded hover:bg-blue-500 transition-colors"
          >
            投稿
          </button>
        </form>
      </div>
    </div>
  );
};
