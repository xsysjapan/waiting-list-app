import "bootstrap/dist/css/bootstrap.css";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import initializeStore from "../src/shared/configureStore";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  (story) => (
    <MemoryRouter>
      <Provider store={initializeStore()}>{story()}</Provider>
    </MemoryRouter>
  ),
];
