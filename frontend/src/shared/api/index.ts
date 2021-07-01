import { Configuration, DefaultApi, DefaultApiInterface } from "./generated";
const api = new DefaultApi(
  new Configuration({
    basePath: "",
  })
);
export default api as DefaultApiInterface;
