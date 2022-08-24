import { Button, Layout, PageHeader, Table } from "antd";
import { useEffect } from "react";
import { BookType } from "../types";
import Book from "./Book";
import styles from "./List.module.css";

interface ListProps {
  books: BookType[] | null;
  loading: boolean;
  error: Error | null;
  getBooks: () => void;
  logout: () => void;
  goAdd: () => void;
}

const List: React.FC<ListProps> = ({
  books,
  loading,
  error,
  getBooks,
  logout,
  goAdd,
}) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);

  useEffect(() => {
    if (error) {
      logout();
    }
  }, [error, logout]);

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button type="primary" onClick={goAdd} className={styles.button}>
            Add Book
          </Button>,
          <Button type="primary" onClick={logout} className={styles.button}>
            Logout
          </Button>,
        ]}
      />
      <Table
        dataSource={[books || []]}
        columns={[
          {
            title: "Book",
            dataIndex: "book",
            key: "book",
            // render: (text, record) => <Book {...record} />,
            render: (text, record) => (
              <>
                {record.map((r) => {
                  return <Book {...r} key={r.bookId} />;
                })}
              </>
            ),
          },
        ]}
        loading={books === null || loading}
        showHeader={false}
        rowKey="bookId"
        pagination={false}
        className={styles.table}
      />
    </Layout>
  );
};

export default List;
