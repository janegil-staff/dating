import { useState } from "react";
import Modal from "../UI/modal";
import SignIn from "../users/auth/signIn";
import SignUp from "../users/auth/signUp";
import classes from "./index.module.css";

function StartingPageContent() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={classes["landing-page-background"]}>
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <SignUp />
        <div className={classes.close}></div>
      </Modal>
      <h1 className={classes.title}>Kjærligheten</h1>
      <div className={classes["btn-group"]}>
        <button
          onClick={() => setIsOpen(true)}
          className={classes["btn-signup"]}
        >
          Opprett konto
        </button>
        <button onClick={() => setIsOpen(true)} className={classes["btn-login"]}>Logg inn</button>
      </div>
    </div>
  );
}

export default StartingPageContent;
