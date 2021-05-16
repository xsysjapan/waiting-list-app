import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should renders login screen given not logged in", () => {
    render(<App />);
    const title = screen.getByText(/ログイン/i);
    expect(title).toBeInTheDocument();
  });
  test("should renders home page given logged in", () => {
    render(<App />);
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const button = screen.getByText("ログイン", {
      selector: "button",
    });
    fireEvent.change(username, { target: { value: "admin" } });
    fireEvent.change(password, { target: { value: "P@ssw0rd" } });
    fireEvent.click(button);
    const title = screen.getByText(/Home Page/i);
    expect(title).toBeInTheDocument();
  });
});
