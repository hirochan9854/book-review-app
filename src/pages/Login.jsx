import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../api";

export const Login = () => {
  const navigate = useNavigate();
  const handleLogin = async (data) => {
    try {
      const response = await login(data.email, data.password);
      console.log(response);
      console.log("User logged in successfully!");
      document.cookie = "token=" + response.token;
      navigate("/");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <div>
        <h2 className="text-center mb-4">ログイン</h2>
        <form
          onSubmit={handleSubmit(handleLogin)}
          className="flex flex-col items-center w-96"
        >
          <div className="mb-4">
            <label htmlFor="email">メールアドレス</label>
            <input
              id="email"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="text"
              aria-label="email"
              name="email"
              placeholder="メールアドレス"
              {...register("email", {
                required: "メールアドレスは必須項目です",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "有効なメールアドレスを入力してください",
                },
              })}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password">パスワード</label>
            <input
              id="password"
              className="border border-gray-400 w-96 py-1 px-1 mb-1"
              type="password"
              aria-label="password"
              placeholder="パスワード"
              {...register("password", {
                required: "パスワードは必須項目です",
                minLength: {
                  value: 8,
                  message: "パスワードは8文字以上で入力してください",
                },
              })}
            />
          </div>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded w-full hover:bg-blue-600 transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
      <Link
        to="/signUp"
        className="mt-4 text-blue-500 hover:underline text-center block"
      >
        新規登録はこちら
      </Link>
    </div>
  );
};
