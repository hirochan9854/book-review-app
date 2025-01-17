const url = "https://railway.bookreview.techtrain.dev";

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
export const iconUpload = async (Authorization, icon) => {
  try {
    const formData = new FormData();
    formData.append("icon", icon);

    const response = await fetch(`${url}/uploads`, {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${Authorization}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${url}/signin`, {
      cors: "no-cors",
      method: "POST",
      body: JSON.stringify({ email, password }),
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

export const getBookData = async (offset) => {
  try {
    const response = await fetch(`${url}/public/books?offset=${offset}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
};

export const getUserData = async () => {
  try {
    const response = await fetch(`${url}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${authorization}`,
      },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("An error occurred:", error.message);
    throw error;
  }
};
