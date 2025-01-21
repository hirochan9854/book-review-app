import { useState, useEffect } from "react";
import { getUserData, updateUserData, iconUpload } from "../api";
import { useForm } from "react-hook-form";
import Compressor from "compressorjs";
import { Header } from "../components/Header";

function getCookieValue(name) {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) {
      return value;
    }
  }
  return null;
}
const authorization = getCookieValue("token");

export const Profile = () => {
  const [user, setUser] = useState({ name: "", iconUrl: "" });
  const [isSuccess, setIsSuccess] = useState(false);

  const fetchData = async () => {
    try {
      const data = await getUserData();
      setUser({
        name: data.name,
        iconUrl: data.iconUrl,
      });
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };
  useEffect(() => {
    if (document.cookie.includes("token")) {
      fetchData();
    }
  }, []);

  const handleUpdate = async (data) => {
    try {
      const response = await updateUserData(data.name);
      if (response.error) {
        setError("api", { message: response.error });
      } else {
        console.log(response);
        console.log("User updated successfully!");
        if (data.icon && data.icon[0]) {
          try {
            const compressedFile = await compressImage(data.icon[0]);
            const iconResponse = await iconUpload(
              authorization,
              compressedFile
            );
            console.log(iconResponse);
            setIsSuccess(true);
            console.log("Icon uploaded successfully!");
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
          "ユーザー情報の更新中にエラーが発生しました。もう一度お試しください。",
      });
    }
  };

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

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      name: "",
      icon: null,
    },
  });

  console.log(user.name);
  return (
    <div>
      <Header />
      <div
        className="flex justify-center items-center  flex-col"
        style={{ height: "calc(100vh - 5rem)" }}
      >
        <h2 className="text-center mb-4">ユーザー情報更新</h2>
        {errors.api && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4 w-96">
            {errors.api.message}
          </div>
        )}
        <form
          onSubmit={handleSubmit(handleUpdate)}
          className="flex flex-col items-center"
        >
          <input
            className="border border-gray-400 w-96 py-1 px-1 mb-1"
            type="text"
            placeholder={user.name}
            defaultValue={user.name}
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
            更新
          </button>
        </form>
        {isSuccess && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded mb-4 mt-5 w-96">
            更新が完了しました
          </div>
        )}
      </div>
    </div>
  );
};
