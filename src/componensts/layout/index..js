import classes from "./layout.module.css";
import Navbar from "./navbar";

const Layout = props => {
  const {session} = props;
  
  return (
    <>
    {session && (
      <Navbar />
    )}
      <main className={classes.background}>{props.children}</main>
    </>
  );
};

export default Layout;
