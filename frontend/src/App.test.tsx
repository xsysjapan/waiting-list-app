import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should renders login screen given not logged in", () => {
    render(<App />);
    const linkElement = screen.getByText(/ログイン/i);
    expect(linkElement).toBeInTheDocument();
  });
});
