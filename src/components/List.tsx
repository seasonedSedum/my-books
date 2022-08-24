import { Button, Layout, PageHeader, Table } from "antd";
import { useEffect } from "react";
import { BookType } from "../types";
import Book from "./Book";

interface ListProps {
  books: BookType[] | null;
  loading: boolean;
  getBooks: () => void;
}

const List: React.FC<ListProps> = ({ books, loading, getBooks }) => {
  useEffect(() => {
    getBooks();
  }, [getBooks]);
  const goAdd = () => {};
  const logout = () => {};

  return (
    <Layout>
      <PageHeader
        title={<div>Book List</div>}
        extra={[
          <Button type="primary" onClick={goAdd}>
            Add Book
          </Button>,
          <Button type="primary" onClick={logout}>
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
      />
    </Layout>
  );
};

export default List;
