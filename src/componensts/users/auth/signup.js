import useInput from "@/hooks/use-input";
import { useRouter } from "next/router";
import { useState } from "react";
import classes from "./signup.module.css";

const createUser = async (email, password) => {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }

  return data;
};

const SignUp = (props) => {
  const { setIsOpen } = props;

  const [error, setError] = useState(null);

  const {
    value: enteredName,
    isValid: enteredNamesValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => /^[A-Za-z]\w{7,14}$/.test(value.trim()));

  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordIsValidConfirmation,
    hasError: passwordConfirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordConfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput((value) => value === enteredPassword);

  const namenputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordConfirmationInputClasses = passwordConfirmationInputHasError
    ? "form-control invalid"
    : "form-control";

  const router = useRouter();
  const submitHandler = async (event) => {
    event.preventDefault();
    
    try {
      const result = await createUser(enteredEmail, enteredPassword);
      router.replace("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className={classes["signUp-form"]} onSubmit={submitHandler}>
      <h2>Opprett bruker</h2>
      <hr />
      {error && <p className={"error-text"}>{error}</p>}
      <div className={classes["form-group"]}>
        <label htmlFor="name">Brukernavn</label>
        <input
          className={namenputClasses}
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
          required
          aria-describedby="nameHelp"
          placeholder="Ola Normann"
        />
        {nameInputHasError && (
          <p className={"error-text"}>E-post må inneholde @</p>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="email">E-post</label>
        <input
          className={emailInputClasses}
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          required
          aria-describedby="emailHelp"
          placeholder="ola@normann.no"
        />
        {emailInputHasError && (
          <p className={"error-text"}>E-post må inneholde @</p>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="password">Passord</label>
        <input
          className={passwordInputClasses}
          type="password"
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          required
          aria-describedby="paswordHelp"
          placeholder="Velg et pasord"
        />
        {passwordInputHasError && (
          <p className={"error-text"}>
            Passord må inneholed mellom 8-16 tegn, minst en bokstav
          </p>
        )}
      </div>
      <div className={classes["form-group"]}>
        <label htmlFor="passwordConfirmation">Gjenta passord</label>
        <input
          className={passwordConfirmationInputClasses}
          type="password"
          id="password"
          onChange={passwordConfirmationChangeHandler}
          onBlur={passwordConfirmationBlurHandler}
          value={enteredPasswordConfirmation}
          required
          aria-describedby="paswordHelp"
          placeholder="Gjenta pasord"
        />
        {passwordConfirmationInputHasError && (
          <p className={"error-text"}>Må være lik dit valgte pasord</p>
        )}
      </div>

      <div className={classes["form-buttons"]}>
        <button
          className={classes["btn-cancel"]}
          onClick={() => setIsOpen(false)}
        >
          Avbryt
        </button>
        <button type="submit" className={classes["btn-ok"]}>
          Opprett
        </button>
      </div>
    </form>
  );
};

export default SignUp;
