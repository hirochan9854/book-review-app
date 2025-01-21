import { useForm } from "react-hook-form";
import { signUp, iconUpload } from "../api";
import Compressor from "compressorjs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../components/Header";

export const SignUp = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (document.cookie.includes("token")) {
      navigate("/");
    }
  }, [navigate]);

  const handleSignUp = async (data) => {
    try {
      const response = await signUp(data.name, data.email, data.password);
      if (response.error) {
        setError("email", { message: response.error });
      } else {
        console.log(response);
        console.log("User created successfully!");
        if (data.icon && data.icon[0]) {
          try {
            const compressedFile = await compressImage(data.icon[0]);
            const iconResponse = await iconUpload(
              response.token,
              compressedFile
            );
            console.log(iconResponse);
            console.log("Icon uploaded successfully!");
            document.cookie = "token=" + response.token;
            navigate("/");
          } catch {
            setError("icon", {
              message:
                "画像のアップロードに失敗しました。もう一度お試しください。",
            });
          }
        }
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setError("api", {
        message:
          "サインアップ中にエラーが発生しました。もう一度お試しください。",
      });
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
      icon: null,
    },
  });

  function compressImage(file) {
    return new Promise((resolve, reject) => {
      const maxSizeInBytes = 800 * 1024;

      new Compressor(file, {
        quality: 0.8,
        convertSize: maxSizeInBytes,
        maxWidth: 512,
        success(result) {
          console.log(
            "Compressed file size:",
            result.size / 1024,
            "KB",
            "Original file size:",
            file.size / 1024,
            "KB"
          );
          resolve(result);
        },
        error(err) {
          reject(err);
        },
      });
    });
  }

  return (
    <div>
      <Header />
      <div
        className="flex justify-center items-center  flex-col"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <h2 className="text-center mb-4">新規登録</h2>
        {errors.api && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-96">
            {errors.api.message}
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleSignUp)}
          className="flex flex-col items-center"
        >
          <input
            className="border border-gray-400 w-96 py-1 px-1 mb-1"
            type="text"
            placeholder="登録名"
            {...register("name", {
              required: "名前は必須項目です",
              minLength: {
                value: 2,
                message: "名前は2文字以上で入力してください",
              },
            })}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mb-4 w-96">
              {errors.name.message}
            </p>
          )}

          <input
            className="border border-gray-400 w-96 py-1 px-1 mb-1"
            type="email"
            placeholder="メールアドレス"
            {...register("email", {
              required: "メールアドレスは必須項目です",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "有効なメールアドレスを入力してください",
              },
            })}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mb-4 w-96">
              {errors.email.message}
            </p>
          )}

          <input
            className="border border-gray-400 w-96 py-1 px-1 mb-1"
            type="password"
            placeholder="パスワード"
            {...register("password", {
              required: "パスワードは必須項目です",
              minLength: {
                value: 8,
                message: "パスワードは8文字以上で入力してください",
              },
            })}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mb-4 w-96">
              {errors.password.message}
            </p>
          )}

          <input
            id="imageInput"
            className="border border-gray-400 w-96 py-1 px-1 mb-1"
            type="file"
            accept=".jpeg,.png"
            {...register("icon")}
          />
          {errors.icon && (
            <p className="text-red-500 text-sm mb-4 w-96">
              {errors.icon.message}
            </p>
          )}

          <button className="bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition-colors">
            登録
          </button>
        </form>{" "}
      </div>
    </div>
  );
};
