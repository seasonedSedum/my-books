import { all } from "redux-saga/effects";
import { authSaga } from "./auth";
import { booksSaga } from "./books";

export default function* rootSaga() {
  // 하위 saga들을 넣어준다.
  yield all([authSaga(), booksSaga()]);
}
