import { useState } from "react";
import Modal from "../UI/modal";
import SignIn from "../users/auth/signIn";
import SignUp from "../users/auth/signUp";
import classes from "./index.module.css";

function StartingPageContent() {
  const [isSignUpOpen, setSignUpIsOpen] = useState(false);
  const [isLogInOpen, setLogInIsOpen] = useState(false);

  return (
    <div className={classes["landing-page-background"]}>
      <Modal isOpen={isSignUpOpen} setIsOpen={setSignUpIsOpen}>
        <SignUp setIsOpen={setLogInIsOpen} />
        <div className={classes.close}></div>
      </Modal>
      <Modal isOpen={isLogInOpen} setIsOpen={setLogInIsOpen}>
        <SignIn setIsOpen={setLogInIsOpen} />
        <div className={classes.close}></div>
      </Modal>
      <h1 className={classes.title}>Kjærligheten</h1>
      <div className={classes["btn-group"]}>
        <button
          onClick={() => setSignUpIsOpen(true)}
          className={classes["btn-signup"]}
        >
          Opprett konto
        </button>
        <button 
        onClick={() => setLogInIsOpen(true)} 
        className={classes["btn-login"]}>Logg inn</button>
      </div>
    </div>
  );
}

export default StartingPageContent;
