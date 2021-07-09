import { configureStore as rtkConfigureStore } from "@reduxjs/toolkit";
import authReducer, { session } from "./authReducer";
import usersReducer from "../users/usersReducer";
import waitingListsReducer from "../waiting-lists/waitingListsReducer";
import settingsReducer from "../settings/settingsReducer";

const configureStore = () => {
  const store = rtkConfigureStore({
    reducer: {
      auth: authReducer,
      users: usersReducer,
      waitingLists: waitingListsReducer,
      settings: settingsReducer,
    },
  });
  store.dispatch(session());
  return store;
};

export type AppDispatch = ReturnType<typeof configureStore>["dispatch"];
export type RootState = ReturnType<
  ReturnType<typeof configureStore>["getState"]
>;

export default configureStore;
