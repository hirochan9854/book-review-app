import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Login } from "./pages/login";

import { SignUp } from "./pages/signup";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};
