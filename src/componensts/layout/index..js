import classes from './layout.module.css';

const Layout = props => {

  return (
    <>
      <main className={classes.background}>{props.children}</main>
    </>
  
  );
}

export default Layout;