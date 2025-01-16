import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";

import { Home } from "./pages/Home";

import { SignUp } from "./pages/signup";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
