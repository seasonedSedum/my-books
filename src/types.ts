export type LoginReqType = {
  email: string;
  password: string;
};

export interface AuthState {
  token: string | null;
  loading: boolean;
  error: Error | null;
}

export interface RootState {
  auth: AuthState;
  books: BooksState;
}

export interface BooksState {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
}

export interface BookType {
  bookId: number;
  title: string;
  author: string;
  createdAt: string;
  url: string;
}

export interface BookReqType {
  title: string;
  message: string;
  author: string;
  url: string;
}
