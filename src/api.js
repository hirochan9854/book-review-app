const url = "https://railway.bookreview.techtrain.dev";

export const signUp = async (name, email, password) => {
  try {
    const response = await fetch(`${url}/users`, {
      cors: "no-cors",
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      // サーバーエラーの場合、エラー内容をスロー
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    // JSONレスポンスをパース
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
};
