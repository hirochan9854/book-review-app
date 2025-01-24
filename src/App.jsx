import { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required.");
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Invalid email address.");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-center font-semibold text-2xl mb-12">Login</h1>
        <form onSubmit={handleLogin} className="w-96">
          <div className="mb-4 flex justify-between">
            <label>Email :</label>
            <input
              className="focus:outline-none border border-blue-400"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4 flex justify-between">
            <label>Password :</label>
            <input
              className="focus:outline-none border border-blue-400 min-w-40"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="bg-blue-400 px-4 py-2 rounded-lg text-white mx-auto block"
            type="submit"
          >
            Login
          </button>
          {error && (
            <p style={{ color: "red" }} data-testid="error-message">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default App;
