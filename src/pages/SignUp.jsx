import { useForm } from "react-hook-form";
import { signUp } from "../api";

export const SignUp = () => {
  const handleSignUp = async (data) => {
    try {
      const response = await signUp(data.name, data.email, data.password);
      if (response.error) {
        setError("email", { message: response.error });
      } else {
        console.log(response);
        console.log("User created successfully!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("api", { message: "An error occurred during sign up" });
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  return (
    <div className="flex justify-center items-center h-screen flex-col">
      <h2 className="text-center mb-4">新規登録</h2>
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="flex flex-col items-center"
      >
        <input
          className="border border-gray-400 w-96 py-1 px-1 mb-5"
          type="text"
          placeholder="登録名"
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && <p>{errors.name.message}</p>}
        <input
          className="border border-gray-400 w-96 py-1 px-1 mb-5"
          type="email"
          placeholder="メールアドレス"
          {...register("email", {
            required: "Email is required",
          })}
        />
        {errors.email && <p>{errors.email.message}</p>}
        <input
          className="border border-gray-400 w-96 py-1 px-1 mb-5"
          type="password"
          placeholder="パスワード"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && <p>{errors.password.message}</p>}
        <button className="bg-blue-500 text-white p-3" type="submit">
          登録
        </button>
      </form>
    </div>
  );
};
