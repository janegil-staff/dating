import useInput from "@/hooks/use-input";
import classes from "./signup.module.css";
const Signup = (props) => {
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput(value => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput(value => /^[A-Za-z]\w{7,14}$/.test(value.trim()));

  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordIsValidConfirmation,
    hasError: passwordConfirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordConfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput(value => value === enteredPassword);

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

    const passwordInputClasses = passwordInputHasError
    ? 'form-control invalid'
    : 'form-control';

    const passwordConfirmationInputClasses = passwordConfirmationInputHasError
    ? 'form-control invalid'
    : 'form-control';

  return (
    <form>
      <div className="form-group">
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
      <div className="form-group">
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
          <p className={"error-text"}>Passord må inneholed mellom 8-16 tegn, minst en bokstav</p>
        )}
      </div>
      <div className="form-group">
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
    </form>
  );
};

export default Signup;
