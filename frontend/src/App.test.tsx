import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "./App";
import { createMemoryHistory, LocationState, History } from "history";
import { MemoryRouter, Router } from "react-router-dom";

function renderAppWithRouter<T = LocationState>(history?: History<T>) {
  if (history) {
    render(
      <Router history={history}>
        <App />
      </Router>
    );
  } else {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
  }
}

describe("App", () => {
  test("should renders login screen given not logged in", () => {
    renderAppWithRouter();
    const title = screen.getByText(/ログイン/i, {
      selector: "h1",
    });
    expect(title).toBeInTheDocument();
  });
  test("should renders not found page when accessing not known page", () => {
    const history = createMemoryHistory();
    history.push("/unknown");
    renderAppWithRouter(history);
    const title = screen.getByText(/404 Not Found/i, {
      selector: "h1",
    });
    expect(title).toBeInTheDocument();
  });
  test("should renders home page given logged in", async () => {
    renderAppWithRouter();
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
