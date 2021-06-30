import { combineReducers } from "redux";
import usersReducer from "./usersReducer";
import waitingListsReducer from "./waitingListsReducer";

const rootReducer = combineReducers({
  users: usersReducer,
  waitingLists: waitingListsReducer,
});

export default rootReducer;
