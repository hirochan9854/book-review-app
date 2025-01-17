import { getUserData } from "../api";
import { useState, useEffect } from "react";

export const Header = () => {
  const [user, setUser] = useState({ name: "", iconUrl: "" });

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

  return (
    <header className="bg-blue-500 text-white p-4 fixed top-0 w-full flex justify-between items-center">
      <h1>書籍レビューアプリ</h1>
      {user.iconUrl ? (
        <div className="flex items-center gap-2 flex-nowrap">
          <img
            src={user.iconUrl}
            alt="ユーザーアイコン"
            className="w-8 h-8 rounded-full"
          />
          <p className="ml-2 text-xl font-medium">{user.name}</p>
          <a href="/profile" className="text-xs ml-6 underline">
            ユーザー情報編集
          </a>
        </div>
      ) : (
        <a className="bg-white text-blue-500 px-4 py-2 rounded" href="/login">
          ログイン
        </a>
      )}
    </header>
  );
};
