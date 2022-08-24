import { combineReducers } from "redux";
import auth from "./auth";
import books from "./books";

// 루트 리듀서. 컴바인 리듀서로 하위 리듀서들을 합쳐준다.
const reducer = combineReducers({
  auth,
  books,
});

export default reducer;
