import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Login } from "../pages/login";

describe("Login Form", () => {
  it("renders login form with all necessary elements", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    // 入力フィールドの存在確認
    const emailInput = screen.getByRole("textbox", { name: /email/i });
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute("type", "text");

    const passwordInput = screen.getByLabelText(/password/i);
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveAttribute("type", "password");

    // ボタンの存在確認
    const loginButton = screen.getByRole("button", { name: /login/i });
    expect(loginButton).toBeInTheDocument();
  });
});
