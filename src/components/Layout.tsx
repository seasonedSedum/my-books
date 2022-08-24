import styles from "./Layout.module.css";

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => (
  <div className={styles.layout}>{children}</div>
);

export default Layout;
