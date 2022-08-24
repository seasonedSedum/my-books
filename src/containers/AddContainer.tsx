import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Add from "../components/Add";
import { BookReqType, RootState } from "../types";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { useNavigate } from "react-router-dom";
import { addBook as addBookSagaStart } from "../redux/modules/books";

const AddContainer = () => {
  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const dispatch = useDispatch();

  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);

  const navi = useNavigate();

  const back = useCallback(() => {
    navi(-1);
  }, [navi]);

  const add = useCallback(
    (book: BookReqType) => {
      dispatch(addBookSagaStart(book));
    },
    [dispatch]
  );

  return <Add loading={loading} logout={logout} back={back} add={add} />;
};

export default AddContainer;
