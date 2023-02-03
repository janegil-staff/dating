import Link from "next/link";
import { signOut } from "next-auth/react";
import classes from "./navbar.module.css";
import {
  ReplyFill,
  HeartFill,
  PersonFill,
  HandThumbsUp,
  ChatHeartFill,
} from "react-bootstrap-icons";

const Navbar = () => {
  const logoutHandler = (event) => {
    signOut();
  };
  return (
    <nav className={classes.navbar}>
      <ul>
        <li>
          <Link href="/">
            <ReplyFill onClick={logoutHandler} />
          </Link>
        </li>
        <li>
          <Link href="/">
            <HeartFill />
          </Link>
        </li>
        <li>
          <Link href="/">
            <HandThumbsUp />
          </Link>
        </li>
        <li>
          <Link href="/">
            <ChatHeartFill />
          </Link>
        </li>
        <li>
          <Link href="/profile">
          <PersonFill />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
