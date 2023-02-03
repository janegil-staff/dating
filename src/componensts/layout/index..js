import classes from "./layout.module.css";
import Navbar from "./navbar";

const Layout = props => {
  return (
    <>
      <Navbar />
      <main className={classes.background}>{props.children}</main>
    </>
  );
};

export default Layout;
