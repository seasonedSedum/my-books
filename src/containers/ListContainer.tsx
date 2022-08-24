import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import List from "../components/List";
import { BookType, RootState } from "../types";
import { getBooks as getBooksSagaStart } from "../redux/modules/books";
import { logout as logoutSagaStart } from "../redux/modules/auth";
import { useNavigate } from "react-router-dom";

export default function ListContainer() {
  const books = useSelector<RootState, BookType[] | null>(
    (state) => state.books.books
  );

  const loading = useSelector<RootState, boolean>(
    (state) => state.books.loading
  );

  const error = useSelector<RootState, Error | null>(
    (state) => state.books.error
  );

  const dispatch = useDispatch();

  const getBooks = useCallback(() => {
    dispatch(getBooksSagaStart());
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logoutSagaStart());
  }, [dispatch]);

  const navi = useNavigate();
  const goAdd = useCallback(() => {
    navi("/add");
  }, [navi]);

  return (
    <List
      books={books}
      loading={loading}
      getBooks={getBooks}
      error={error}
      logout={logout}
      goAdd={goAdd}
    />
  );
}
