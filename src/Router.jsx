import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Login } from "./pages/login";
import { Home } from "./pages/Home";
import { SignUp } from "./pages/signup";
import { Profile } from "./pages/Profile";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
};
