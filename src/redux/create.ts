import { applyMiddleware, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducer from "./modules/reducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./modules/rootSaga";
import TokenService from "../services/TokenService";

const create = () => {
  const token = TokenService.get();
  const sagaMiddleware = createSagaMiddleware();

  // 스토어를 만들 때 루트 리듀서를 넣어주고, 미들웨어 설정도 같이 했다.
  const store = createStore(
    reducer,
    {
      auth: {
        token,
        loading: false,
        error: null,
      },
    },
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );

  sagaMiddleware.run(rootSaga);

  return store;
};

export default create;
