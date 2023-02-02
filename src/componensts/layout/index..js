import { signOut } from "next-auth/react";

const Layout = props => {

  return (
    <>
      <main>{props.children}</main>
    </>
  
  );
}

export default Layout;