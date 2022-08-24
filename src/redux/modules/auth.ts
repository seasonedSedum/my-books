import { Action, createActions, handleActions } from "redux-actions";
import { call, put, select, takeEvery } from "redux-saga/effects";
import TokenService from "../../services/TokenService";
import UserService from "../../services/UserService";
import { AuthState, LoginReqType } from "../../types";

const initialState: AuthState = {
  token: null,
  loading: false,
  error: null,
};

const prefix = "my-books/auth";

export const { pending, success, fail } = createActions(
  "PENDING",
  "SUCCESS",
  "FAIL",
  { prefix }
);

// atcion.payload의 타입은 토큰의 string과 error의 Error이 있을텐데
// 둘이 달라서 타입을 정해줄 수 없으니 일단 string으로 받고
// error에 들어갈 action에는 any를 해준다.
const reducer = handleActions<AuthState, string>(
  {
    PENDING: (state) => ({
      ...state,
      loading: true,
      error: null,
    }),
    // 성공하는 경우에 토큰을 받아서 셋팅해줘야 하니까 action도 넣어준다.
    SUCCESS: (state, action) => ({
      token: action.payload,
      loading: false,
      error: null,
    }),
    // 에러가 action에 있으니 action도 넣어준다.
    FAIL: (state, action: any) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  { prefix }
);

export default reducer;

// saga
export const { login, logout } = createActions("LOGIN", "LOGOUT", { prefix });

function* loginSaga(action: Action<LoginReqType>) {
  try {
    yield put(pending());
    // api 로직 분리
    const token: string = yield call(UserService.login, action.payload);
    TokenService.set(token);
    yield put(success(token));
  } catch (error) {
    yield put(
      fail(error instanceof Error ? new Error(error?.message) : "UNKNOWN_ERROR")
    );
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token: string = yield select((state) => state.auth.token);
    yield call(UserService.logout, token);
    TokenService.set(token);
  } catch (error) {
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}
// auth.ts에서 사이드 이펙트가 일어나는 로직들을 넣어준다.
export function* authSaga() {
  yield takeEvery(`${prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${prefix}/LOGOUT`, logoutSaga);
}
