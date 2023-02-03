import useInput from "@/hooks/use-input";
import classes from "./signup.module.css";
import { useState } from "react";
import { signInUser } from "@/helpers/user-helper";
import { useRouter } from "next/router";

const SignIn = (props) => {
  const { setIsOpen } = props;
  const [error, setError] = useState(null);
  const router = useRouter();
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

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    let options = {
      redirect: false,
      email: enteredEmail,
      password: enteredPassword,
    };
    const result = await signInUser({
      type: "credentials",
      options,
      setError,
    });

    if(!result.error) {
      router.replace("/profile");
    }
  };

  return (
    <form className={classes["signUp-form"]} onSubmit={submitHandler}>
      <h2>Logg inn</h2>
      <hr />
      {error && <p className="error-text">{error}</p>}

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
          placeholder="Enter email"
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

      <div className={classes["form-buttons"]}>
        <button
          type="button"
          className={classes["btn-cancel"]}
          onClick={() => setIsOpen(false)}
        >
          Avbryt
        </button>
        <button type="submit" className={classes["btn-ok"]}>
          Logg inn
        </button>
      </div>
    </form>
  );
};

export default SignIn;
