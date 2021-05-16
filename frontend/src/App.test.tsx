import * as React from "react";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";

describe("App", () => {
  test("should renders login screen given not logged in", () => {
    render(<App />);
    const title = screen.getByText(/ログイン/i, {
      selector: "h1",
    });
    expect(title).toBeInTheDocument();
  });
  test("should renders home page given logged in", async () => {
    render(<App />);
    const username = screen.getByTestId("username");
    const password = screen.getByTestId("password");
    const button = screen.getByText("ログイン", {
      selector: "button",
    });
    act(() => {
      fireEvent.change(username, { target: { value: "admin" } });
    });
    expect(username).toHaveProperty("value", "admin");
    act(() => {
      fireEvent.change(password, { target: { value: "P@ssw0rd" } });
    });
    expect(password).toHaveProperty("value", "P@ssw0rd");
    act(() => {
      fireEvent.click(button);
    });
    await waitFor(() => {
      const title = screen.getByText(/Home Page/i);
      expect(title).toBeInTheDocument();
    });
  });
});
